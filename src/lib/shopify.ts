import axios from "axios";

const shopifyDomain = "smile-everyday-cookies.myshopify.com";
const apiVersion = "2023-07";
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;

export const getShopifyProducts = async () => {
	try {
		const response = await axios.get(
			`https://${apiKey}:${apiSecret}@${shopifyDomain}/admin/api/${apiVersion}/products.json`
		);
		console.log("here is the shopify api response", response);
		return response.data.products;
	} catch (err) {
		console.error("error fetching Shopify products", err);
		return [];
	}
};
