type ProductCategory = {
	id: string;
	categorie_name: string;
};

export async function getAllCategories(n: number) {
	try {
		const productCats = await fetch(`${process.env.REACT_APP_API_URL}products/get-categories`);
		return productCats.json();
	} catch (error) {
		return [];
	}
}
