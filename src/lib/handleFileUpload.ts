const handleFileUpload = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file);

	const response = await fetch("/api/uploadToS3", {
		method: "POST",
		body: formData,
	});

	console.log("here is the response", response);

	if (!response.ok) {
		throw new Error("Failed to upload file");
	}

	const data = await response.json();
	return data.url; // Return the S3 file URL
};

export default handleFileUpload;
