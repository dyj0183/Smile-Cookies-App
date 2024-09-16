"use client";

import { useState } from "react";
import axios from "axios";

export default function AddToShopifyForm() {
	const [title, setTitle] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [price, setPrice] = useState("");
	const [inventoryQuantity, setInventoryQuantity] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/shopify", {
				title,
				imageUrl,
				price,
				inventoryQuantity,
			});

			alert("Product added successfully!");
			console.log(response.data);
		} catch (error) {
			console.error("Error adding product:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
		>
			<div className="flex flex-col">
				<label htmlFor="title" className="mb-2 font-medium text-gray-700">
					Title:
				</label>
				<input
					id="title"
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="imageUrl" className="mb-2 font-medium text-gray-700">
					Image URL:
				</label>
				<input
					id="imageUrl"
					type="text"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>
			<div className="flex flex-col">
				<label htmlFor="price" className="mb-2 font-medium text-gray-700">
					Price:
				</label>
				<input
					id="price"
					type="text"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>
			<div className="flex flex-col">
				<label
					htmlFor="inventoryQuantity"
					className="mb-2 font-medium text-gray-700"
				>
					Inventory Quantity:
				</label>
				<input
					id="inventoryQuantity"
					type="number"
					value={inventoryQuantity}
					onChange={(e) => setInventoryQuantity(e.target.value)}
					className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>
			<button
				type="submit"
				className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				Add Product
			</button>
		</form>
	);
}
