"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define the product interface
interface ShopifyProduct {
	id: number;
	title: string;
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
		<div>
			<h1>Shopify Products</h1>
			{products.map((product) => (
				<div key={product.id}>
					<h2>{product.title}</h2>
					{/* <p>{product.body_html}</p> */}
				</div>
			))}
		</div>
	);
}
