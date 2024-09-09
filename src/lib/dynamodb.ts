import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient({
	region: process.env.NEXT_PUBLIC_AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default dynamoDb;
