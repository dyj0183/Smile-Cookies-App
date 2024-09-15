"use client"; // Ensure client-side rendering for this component
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import handleFileUpload from "../../lib/handleFileUpload"; // Create this helper function
import { GET_COOKIES } from "../cookies/page";

const ADD_COOKIE = gql`
	mutation AddCookie(
		$name: String!
		$description: String!
		$imageUrl: String!
		$size: String!
	) {
		addCookie(
			name: $name
			description: $description
			imageUrl: $imageUrl
			size: $size
		) {
			cookieId
			name
			description
			imageUrl
			size
		}
	}
`;

export default function AddCookieForm() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [addCookie] = useMutation(ADD_COOKIE, {
		refetchQueries: [{ query: GET_COOKIES }], // This will refetch the cookies
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		console.log("submit btn was clicked");

		// 1. Upload image to S3
		if (file) {
			const imageUrl = await handleFileUpload(file); // Implement this to upload to S3
			console.log("new image url", imageUrl);

			// 2. Send data to the GraphQL API
			const size = "large";
			addCookie({
				variables: { name, description, imageUrl, size },
			})
				.then(() => alert("Cookie added successfully!"))
				.catch((error) => console.error("Error adding cookie:", error));
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
		>
			<div className="flex flex-col">
				<label htmlFor="name" className="mb-2 font-medium text-gray-700">
					Cookie Name:
				</label>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="description" className="mb-2 font-medium text-gray-700">
					Cookie Description:
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					// required
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="file" className="mb-2 font-medium text-gray-700">
					Upload Cookie Image:
				</label>
				<input
					id="file"
					type="file"
					onChange={handleFileChange}
					className="p-2 border border-gray-300 rounded-md shadow-sm file:border-none file:bg-blue-500 file:text-white file:p-2 file:rounded-md hover:file:bg-blue-600"
				/>
			</div>
			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Add Cookie
			</button>
		</form>
	);
}
