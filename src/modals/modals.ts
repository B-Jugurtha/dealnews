export type ProductCategory = {
	id: string;
	categorie_name: string;
};
export type ProductBrand = {
	brand: string;
	count: number;
};
export type ProductStore = {
	original_store: string;
	count: number;
};
export type Product = {
	id: number;
	full_name: string;
	photo: string;
	price: string;
	original_link: string;
	original_store: string;
	brand: string;
	staff_pick: boolean;
	description: string;
	categorie: ProductCategory[];
	time_added: string;
};

export type Session = {
	loggedin: boolean;
	firstName: string;
	lastName: string;
	mail: string;
	phone: string;
	addresse: string;
	token: string;
	userId: string;
};
export type Aboutus = {
	address: string;
	email: string;
	google_map_link: string;
	logo: string;
	phone_number: string;
	title: string;
	content: string;
};
