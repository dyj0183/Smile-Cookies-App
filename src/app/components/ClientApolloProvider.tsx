"use client"; // Ensure this is only rendered on the client-side

import { ApolloProvider } from "@apollo/client";
import client from "../../lib/apolloClient";

export default function ClientApolloProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
