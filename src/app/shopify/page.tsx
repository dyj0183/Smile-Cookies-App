"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Variant {
	price: string;
	inventory_quantity: number;
}

// Define the product interface
interface ShopifyProduct {
	id: number;
	title: string;
	variants: Variant[];
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
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{products.map((product) => (
					<div
						key={product.id}
						className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200"
					>
						<h2 className="text-xl font-semibold mb-2">{product.title}</h2>
						<p className="text-gray-600">
							Price:{" "}
							<span className="font-bold text-blue-500">
								${product.variants[0].price}
							</span>
						</p>
						<p className="text-gray-600">
							Available Quantity:{" "}
							<span className="font-bold text-green-500">
								{product.variants[0].inventory_quantity}
							</span>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
