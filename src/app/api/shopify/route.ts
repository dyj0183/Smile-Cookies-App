import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		const response = await axios.get(
			"https://smile-everyday-cookies.myshopify.com/admin/api/2024-07/products.json",
			{
				headers: {
					"X-Shopify-Access-Token": process.env.SHOPIFY_API_ACCESS_TOKEN,
				},
			}
		);

		return NextResponse.json(response.data);
	} catch (error) {
		return NextResponse.error(); // Handle error
	}
}

export async function POST(request: Request) {
	try {
		const { title, imageUrl, price, inventoryQuantity } = await request.json();

		const response = await axios.post(
			`https://smile-everyday-cookies.myshopify.com/admin/api/2024-07/products.json`,
			{
				product: {
					title,
					images: [{ src: imageUrl }],
					variants: [
						{
							price,
							inventory_quantity: inventoryQuantity,
						},
					],
				},
			},
			{
				headers: {
					"X-Shopify-Access-Token": process.env.SHOPIFY_API_ACCESS_TOKEN,
					"Content-Type": "application/json",
				},
			}
		);

		return NextResponse.json(response.data);
	} catch (error) {
		console.error("Error creating product:", error);
		return NextResponse.error(); // Handle error
	}
}
