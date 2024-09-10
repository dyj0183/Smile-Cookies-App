import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3 = new S3Client({
	region: process.env.NEXT_PUBLIC_AWS_REGION!,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});

export async function POST(request: NextRequest) {
	try {
		// Log request details
		console.log("Request received for file upload");

		const formData = await request.formData();
		const file = formData.get("file") as Blob;

		if (!file) {
			console.error("File not provided in form data");
			return NextResponse.json({ error: "File not provided" }, { status: 400 });
		}

		// Log file details for debugging
		console.log("File received:", file);

		// Convert Blob to Buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const fileName = `${Date.now()}-${file.name}`;

		const params = {
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
			Key: fileName,
			Body: buffer,
			ContentType: file.type,
		};

		console.log("Uploading file to S3 with params:", params);

		const command = new PutObjectCommand(params);
		await s3.send(command);

		const fileUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
		console.log("File uploaded successfully:", fileUrl);

		return NextResponse.json({ url: fileUrl });
	} catch (error) {
		console.error("Error during file upload:", error);
		return NextResponse.json(
			{ error: "Error uploading file" },
			{ status: 500 }
		);
	}
}
