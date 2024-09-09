import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import dynamoDb from "../../../lib/dynamodb";

// Define type definitions
const typeDefs = gql`
	type Cookie {
		cookieId: String
		name: String
		description: String
		imageUrl: String
		size: String
	}

	type Query {
		cookies: [Cookie]
	}

	type Mutation {
		addCookie(
			name: String!
			description: String!
			imageUrl: String!
			size: String!
		): Cookie
	}
`;

// Define resolvers
const resolvers = {
	Query: {
		cookies: async () => {
			const params = { TableName: "Cookies" };
			const data = await dynamoDb.scan(params).promise();
			return data.Items;
		},
	},

	Mutation: {
		addCookie: async (_, { name, description, imageUrl, size }) => {
			const cookieId = name; // Generate a unique ID for the new cookie

			console.log("adding new cookie", { name, description, imageUrl, size });

			// Define the parameters to save the cookie in DynamoDB
			const params = {
				TableName: "Cookies",
				Item: {
					cookieId,
					name,
					description,
					imageUrl,
					size,
				},
			};

			// Save the new cookie to DynamoDB
			try {
				await dynamoDb.put(params).promise();
				return {
					cookieId,
					name,
					description,
					imageUrl,
					size,
				};
			} catch (error) {
				throw new Error("Error adding cookie to DynamoDB: " + error.message);
			}
		},
	},
};

// Create Apollo Server instance
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

// Export the handler for Next.js
export const handler = startServerAndCreateNextHandler(apolloServer);

// Configure and export route handler
export async function GET(request: Request) {
	return handler(request);
}

export async function POST(request: Request) {
	return handler(request);
}
