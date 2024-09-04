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
