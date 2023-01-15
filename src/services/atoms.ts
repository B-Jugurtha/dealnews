import { atom } from 'jotai';
import { Aboutus, Product, ProductStore, Session } from '../modals/modals';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<Session>(() => sessionStorage);
export const sessionAtom = atomWithStorage(
	'session',
	{
		loggedin: false,
		firstName: '',
		lastName: '',
		mail: '',
		phone: '',
		addresse: '',
		token: '',
		userId: '',
	},
	storage
);

export const productsPageAtom = atom(1);
export const productsListAtom = atom<Product[]>([]);
export const staffProductsListAtom = atom<Product[]>([]);
export const storesAtom = atom<ProductStore[]>([]);
export const aboutUsAtom = atom<Aboutus>({
	address: '',
	email: '',
	google_map_link: '',
	logo: '',
	phone_number: '',
	title: '',
	content: '',
});
