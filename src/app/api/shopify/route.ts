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
