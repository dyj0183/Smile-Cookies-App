"use client"; // Ensure this component is only rendered on the client-side

import { gql, useQuery } from "@apollo/client";

const GET_COOKIES = gql`
	query GetCookies {
		cookies {
			cookieId
			name
			description
			imageUrl
			size
		}
	}
`;

export default function CookiesPage() {
	const { loading, error, data } = useQuery(GET_COOKIES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	console.log("data", data);

	type Cookie = {
		cookieId?: string;
		name?: string;
		description?: string;
		imageUrl?: string;
		size?: string;
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
			<h1 className="text-3xl font-bold mb-8">
				Welcome to Yu-Chun's Smile Cookies Page
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
				{data.cookies.map((cookie: Cookie) => (
					<div
						key={cookie.cookieId}
						className="flex items-center bg-white rounded-lg shadow-lg p-6"
					>
						<div className="w-1/2">
							<h2 className="text-2xl font-semibold mb-2">{cookie.name}</h2>
							<p className="text-gray-700 mb-2">{cookie.description}</p>
							<p className="text-gray-500 text-sm">
								Cookie size: {cookie.size}
							</p>
						</div>
						<div className="w-1/2">
							<img
								src={cookie.imageUrl}
								alt={cookie.name}
								className="object-cover rounded-lg"
								style={{ width: "200px", height: "150px" }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
