import { NextResponse } from "next/server";
import dynamoDb from "../../../lib/dynamodb";

export async function GET() {
	const params = {
		TableName: "Cookies",
	};

	try {
		const data = await dynamoDb.scan(params).promise();
		return NextResponse.json(data.Items);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to retrieve cookies" },
			{ status: 500 }
		);
	}
}
