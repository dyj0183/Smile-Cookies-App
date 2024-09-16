"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AddToShopifyForm from "../components/AddToShopifyForm";

interface Variant {
	price: string;
	inventory_quantity: number;
}

interface Image {
	src: string;
}

// Define the product interface
interface ShopifyProduct {
	id: number;
	title: string;
	variants: Variant[];
	image: Image;
}

export default function ShopifyProducts() {
	const [products, setProducts] = useState<ShopifyProduct[]>([]);

	useEffect(() => {
		axios
			.get("/api/shopify")
			.then((response) => {
				setProducts(response.data.products);
				console.log("api response", response);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
			});
	}, []);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-8 text-center">Shopify Products</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
				{products.map((product) => (
					<div
						key={product.id}
						className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
					>
						<img
							src={product.image.src}
							alt={product.title}
							className="w-full h-64 object-cover rounded-md mb-4"
						/>
						<h2 className="text-xl font-semibold mb-2">{product.title}</h2>
						<p className="text-gray-600">
							Price:{" "}
							<span className="font-bold text-blue-500">
								${product.variants[0].price}
							</span>
						</p>
						<p className="text-gray-600">
							Available Quantity:{" "}
							<span
								className={`font-bold ${
									product.variants[0].inventory_quantity > 0
										? "text-green-500"
										: "text-red-500"
								}`}
							>
								{product.variants[0].inventory_quantity > 0
									? product.variants[0].inventory_quantity
									: "Out of Stock"}
							</span>
						</p>
					</div>
				))}
			</div>

			{/* Add the form in a separate section with some spacing */}
			<div className="bg-gray-100 p-6 rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Add a New Product
				</h2>
				<AddToShopifyForm />
			</div>
		</div>
	);
}
