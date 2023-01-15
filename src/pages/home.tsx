import React, { useEffect, useState } from 'react';
import { productsListAtom, productsPageAtom, sessionAtom, staffProductsListAtom, storesAtom } from '../services/atoms';
import { Product, ProductCategory } from '../modals/modals';
import { useAtom } from 'jotai';
import Modal from '../components/utlis/Modal';
import { useQuery } from '@tanstack/react-query';

type Props = {};

export const Home = (props: Props) => {
	const [slides, setPosition] = useState(['', '', '', '', '']);
	const [nbrProductLoad, setNbrProductLoad] = useState(10);
	const [stores, setStores] = useAtom(storesAtom);
	const [showmore, setShowmore] = useState(-1);
	const [session, setSession] = useAtom(sessionAtom);
	const [products, setProducts] = useAtom(productsListAtom);
	const [staffProducts, setStaffProducts] = useAtom(staffProductsListAtom);
	const [productsPage, setProductsPage] = useAtom(productsPageAtom);
	const [showOrder, setShowOrder] = useState(false);
	const [fullname, setFullname] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');
	const [selectedProduct, setSelectedProduct] = useState<Product | null>();
	const [orderIsLoading, setOrderIsLoading] = useState(false);
	const [errors, setErrors] = useState({
		fullname: false,
		phone: false,
		address: false,
	});
	const [selectedCat, setSelectedCat] = useState('');
	const [selectedStore, setSelectedStore] = useState('');
	const [isStaffPick, setIsStaffPick] = useState(false);
	const {
		isLoading: categoriesIsLoading,
		error: categoriesError,
		data: categories,
	} = useQuery<ProductCategory[], Error>({
		queryKey: ['repoData'],
		queryFn: () => fetch(`${process.env.REACT_APP_API_URL}products/get-categories`).then((res) => res.json()),
	});
	const productFilter = (stafPick: boolean, category: string, store: string, brand: string) => {
		setProductsPage(1);
		let param = '';
		if (stafPick) {
			param += '&staff_pick=true';
		}
		if (category) {
			param += `&categorie__categorie_name=${category}`;
		}
		if (store) {
			param += `&original_store=${store}`;
		}
		if (stafPick || category || store || brand) {
			fetch(`${process.env.REACT_APP_API_URL}products/?ordering=-time_added${param}`)
				.then((res) => res.json())
				.then((newProducts) => {
					if (newProducts.results) {
						setProducts([...newProducts.results]);
						setProductsPage(productsPage + 1);
					} else {
						setProductsPage(0);
					}
				});
		} else {
			fetch(`${process.env.REACT_APP_API_URL}products/?ordering=-time_added&page=1`)
				.then((res) => res.json())
				.then((newProducts) => {
					if (newProducts.results) {
						setProducts([...newProducts.results]);
						setProductsPage(productsPage + 1);
					} else {
						setProductsPage(0);
					}
				});
		}
	};

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}products/?ordering=-time_added&page=${productsPage}`)
			.then((res) => res.json())
			.then((newProducts) => {
				if (newProducts.results) {
					setProducts([...products, ...newProducts.results]);
					setProductsPage(productsPage + 1);
				} else {
					setProductsPage(0);
				}
			});
		fetch(`${process.env.REACT_APP_API_URL}products/?ordering=-time_added&staff_pick=true`).then((res) =>
			res.json().then((sp) => {
				if (sp.results) {
					setStaffProducts([...sp.results]);
				}
			})
		);
	}, []);

	useEffect(() => {}, [selectedCat, selectedStore, isStaffPick]);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!fullname || !phone || !address) {
			let newErrors = { ...errors };
			if (!fullname) {
				newErrors.fullname = true;
			}
			if (!phone) {
				newErrors.phone = true;
			}
			if (!address) {
				newErrors.address = true;
			}
			setErrors({ ...newErrors });
			return;
		}
		setOrderIsLoading(true);
		let order = {
			products: [selectedProduct?.id],
			full_name: fullname,
			address: address,
			phone_number: phone,
			description: description,
			user: session.userId,
		};

		fetch(`${process.env.REACT_APP_API_URL}products/add-order`, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				Authorization: `Token ${session.token}`,
				'Content-Type': 'application/json',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(order),
		}).then((e) => {
			console.log('1');
			console.log(e);
			e.json().then((ee) => {
				console.log('2');
				console.log(ee);
			});
		});

		console.log('handle submit');
	};
	return (
		<div className='xl:max-w-screen-xl m-auto '>
			<div className='p-4 flex justify-center'>
				<img src={require('../assets/img/top_banner.webp')} alt='Top Ad' />
			</div>
			{/* <div className='carousel-wrapper'>
				<Carousel autoPlay infiniteLoop>
					<div className='flex gap-4 p-2'>
						<div className='rounded-md shadow-md shadow-[#1212124a] w-[160px]'>
							<div>
								<img src={require('../assets/img/placeholder.webp')} alt='product' />
							</div>
							<div className='pb-0 p-2 '>
								<div className='text-xs font-light text-[#7f8387] my-1'>Sam's Club</div>
								<div className='text-sm font-medium line-clamp-3 h-16'>Sam's Club Clearance Sam's Club Clearance Sam's Club Clearance qsdqs </div>
								<button className='text-[#00a863] font-semibold text-lg'>Shop Now</button>
							</div>
							<div>
								<span>Details &gt;</span>
							</div>
						</div>
						<div className='rounded-md shadow-md shadow-[#1212124a] w-[160px]'>
							<div>
								<img src={require('../assets/img/placeholder.webp')} alt='product' />
							</div>
							<div className='pb-0 p-2 '>
								<div className='text-xs font-light text-[#7f8387] my-1'>Sam's Club</div>
								<div className='text-sm font-medium line-clamp-3 h-16'>Sam's Club Clearance</div>
								<button className='text-[#00a863] font-semibold text-lg'>Shop Now</button>
							</div>
							<div className='flex '>
								<span className='flex-1'></span>
								<span className='text-[.9em] p-2 font-semibold text-[#214b82]'>Details &gt;</span>
							</div>
						</div>
					</div>
					<div></div>
				</Carousel>
			</div> */}
			<div className=' flex'>
				<div className='basis-4/5'>
					<div className='w-full'>
						<div className='border-2 p-2 w-fit'>
							<span className='font-bold text-gray-800'>Filtres:</span>
							<div className='flex gap-8 items-center justify-center pt-2'>
								<span
									onClick={() => {
										productFilter(!isStaffPick, selectedCat, selectedStore, '');
										setIsStaffPick(!isStaffPick);
									}}
									className={isStaffPick ? 'border-2 rounded-xl p-1 text-xs hover:cursor-pointer border-blue-300 bg-blue-100' : 'border-2 rounded-xl p-1 text-xs hover:cursor-pointer'}>
									Choix de l' équipe
								</span>
								<div className='relative group'>
									{selectedCat ? (
										<span className='max-w-[140px] truncate border-2 rounded-xl p-1 text-sm hover:border-blue-300 hover:bg-blue-100 hover:cursor-pointer'>{selectedCat}</span>
									) : (
										<span className='max-w-[140px] truncate border-2 rounded-xl p-1 text-sm hover:border-blue-300 hover:bg-blue-100 hover:cursor-pointer'>Catégorie</span>
									)}
									<ul className='absolute bg-white p-2 group-hover:block hidden border-2 top-7 rounded-lg'>
										{categories?.map((cat, i) => {
											return (
												<li
													key={i}
													className='p-1 hover:cursor-pointer hover:bg-blue-100'
													onClick={() => {
														setSelectedCat(cat.categorie_name);
														productFilter(isStaffPick, cat.categorie_name, selectedStore, '');
													}}>
													{cat.categorie_name}
												</li>
											);
										})}
									</ul>
								</div>
								<div className='relative group'>
									{selectedStore ? (
										<span className='max-w-[140px] truncate border-2 rounded-xl p-1 text-sm hover:border-blue-300 hover:bg-blue-100 hover:cursor-pointer'>{selectedStore}</span>
									) : (
										<span className='max-w-[140px] truncate border-2 rounded-xl p-1 text-sm hover:border-blue-300 hover:bg-blue-100 hover:cursor-pointer'>Store</span>
									)}
									<ul className='absolute bg-white p-2 group-hover:block hidden border-2 top-7 rounded-lg'>
										{stores?.map((store, i) => {
											return (
												<li
													key={i}
													className='p-1 hover:cursor-pointer hover:bg-blue-100'
													onClick={() => {
														setSelectedStore(store.original_store);
														productFilter(isStaffPick, selectedCat, store.original_store, '');
													}}>
													{store.original_store}
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className='flex gap-4 p-2 flex-wrap'>
						{staffProducts.map((e, i) => {
							return (
								<div className='rounded-md shadow-md shadow-[#1212124a] w-[160px]' key={i}>
									<div>
										<img src={e.photo} alt='product' className='w-[160px] h-[160px]' />
									</div>
									<div className='pb-0 p-2 '>
										<div className='text-xs font-light text-[#7f8387] my-1'>{e.original_store}</div>
										<div className='text-sm font-medium line-clamp-3 h-16'>{e.full_name}</div>
										<button className='text-[#00a863] font-semibold text-lg'>Commander</button>
									</div>
									<div className='flex '>
										<span className='flex-1'></span>
										<span className='text-[.9em] p-2 font-semibold text-[#214b82]'>Détails &gt;</span>
									</div>
								</div>
							);
						})}
					</div>
					<div>
						{products.map((e, i) => {
							return (
								<div className='border-2 rounded-xl flex my-4' key={i}>
									<span className='flex items-center p-2'>
										<img className='w-[135px] h-[135px]' src={e.photo} alt='product' />
									</span>
									<div className='flex-1 flex flex-col ml-2'>
										<span className='text-[#7f8387] text-xs py-1 capitalize'>{e.original_store}</span>
										<span className='font-bold'>{e.full_name}</span>
										<span className='py-4 font-bold text-lg text-[#00a863]'>{e.price} DZD</span>
										{e.description ? (
											<div>
												<span className='capitalize font-bold'>Description:</span>
												<p className={showmore === i ? '' : 'line-clamp-2'}>{e.description}</p>
												{showmore === i ? (
													<button
														className='text-sm font-bold text-[#214b82]'
														onClick={() => {
															setShowmore(-1);
														}}>
														show less
													</button>
												) : (
													<button
														className='text-sm font-bold text-[#214b82]'
														onClick={() => {
															setShowmore(i);
														}}>
														show more
													</button>
												)}
											</div>
										) : (
											''
										)}
									</div>
									<div className='flex items-center justify-center p-4'>
										<button
											className='bg-[#00a863] text-white shadow-xl px-4 py-2'
											onClick={() => {
												setSelectedProduct(products[i]);
												setFullname(session.firstName + ' ' + session.lastName);
												setAddress(session.addresse);
												setPhone(session.phone);
												setShowOrder(true);
											}}>
											Commander
										</button>
									</div>
								</div>
							);
						})}
						<div className='w-full flex items-center justify-center'>
							{productsPage ? (
								<button
									className='text-center font-bold hover:cursor-pointer text-[#214b82]'
									onClick={() => {
										fetch(`${process.env.REACT_APP_API_URL}products/?ordering=-time_added&page=${productsPage}`)
											.then((res) => res.json())
											.then((newProducts) => {
												if (newProducts.results) {
													setProducts([...products, ...newProducts.results]);
													setProductsPage(productsPage + 1);
												} else {
													setProductsPage(0);
												}
											});
									}}>
									Show More
								</button>
							) : (
								''
							)}
						</div>
					</div>
				</div>
				<div className='basis-1/5 flex flex-col sm:hidden '>
					{Array(10)
						.fill('')
						.map((e, i) => {
							return (
								<div className='flex flex-col mb-6 p-2 hover:cursor-pointer' key={i}>
									<span className='truncate capitalize font-bold text-lg text-[#214b82]'>This is a Title For Testing purpoces</span>
									<div>
										<img src={require('../assets/img/ad.jpg')} alt='Ad' />
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<iframe
				className='p-4'
				width='100%'
				height='300'
				title='Map'
				src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'>
				<a href='https://www.maps.ie/distance-area-calculator.html'>measure area map</a>
			</iframe>
			<Modal
				handleClose={() => {
					setSelectedProduct(null);
					setShowOrder(false);
				}}
				isOpen={showOrder}
				className='bg-white text-center relative '
				key={0}>
				<div className={orderIsLoading ? 'blur-sm flex' : 'flex'}>
					<div>
						<h2 className='font-bold text-lg p-2'>Commande:</h2>
						<form action='submit' className='flex flex-col items-center text-left' onSubmit={handleSubmit} id='order'>
							<div className='p-2 '>
								<label htmlFor='fullname' className='p-1 text-xs '>
									Nom Complet:
									<br />
								</label>
								<input
									value={fullname}
									onChange={(e) => {
										setErrors({ ...errors, fullname: false });
										setFullname(e.target.value);
									}}
									type='text'
									name='fullname'
									id='fullname'
									placeholder='Full Name'
									className='bg-gray-300 rounded focus:outline-0 px-2 py-1'
								/>
								{errors.fullname ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquer votre nom & prénom.</div> : ''}
							</div>
							<div className='p-2 '>
								<label htmlFor='phone' className='p-1 text-xs '>
									Num. téléphone:
									<br />
								</label>
								<input
									value={phone}
									onChange={(e) => {
										setErrors({ ...errors, phone: false });
										setPhone(e.target.value);
									}}
									type='text'
									name='phone'
									id='phone'
									placeholder='Numéro de téléphone'
									className='bg-gray-300 rounded focus:outline-0 px-2 py-1'
								/>
								{errors.phone ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquez votre numéro de téléphone.</div> : ''}
							</div>
							<div className='p-2 '>
								<label htmlFor='address' className='p-1 text-xs '>
									Adresse:
									<br />
								</label>
								<textarea
									value={address}
									onChange={(e) => {
										setErrors({ ...errors, address: false });
										setAddress(e.target.value);
									}}
									name='address'
									id='address'
									placeholder='Adresse'
									className='bg-gray-300 rounded focus:outline-0 px-2 py-1'
								/>
								{errors.address ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquer votre adresse.</div> : ''}
							</div>
							<div className='p-2 '>
								<label htmlFor='description' className='p-1 text-xs '>
									Détail sur la commande:
									<br />
								</label>
								<textarea
									value={description}
									onChange={(e) => {
										setDescription(e.target.value);
									}}
									name='desc'
									id='desc'
									placeholder='Détail sur la commande'
									className='bg-gray-300 rounded focus:outline-0 px-2 py-1'
								/>
							</div>
						</form>
					</div>
					<div>
						<h2 className='font-bold text-lg p-2'>Produit:</h2>
						<div className='flex flex-col items-center text-left'>
							<div className='p-2 max-w-[220px]'>
								<img src={selectedProduct?.photo} alt='Ad' />
							</div>
							<div className='p-2 '>
								<label htmlFor='fullname' className='p-1 text-xs font-bold'>
									Nom du produit:
									<br />
								</label>
								<span className='line-clamp-2 max-w-[200px] text-sm font-bold text-gray-700'>{selectedProduct?.full_name}</span>
							</div>
							{selectedProduct?.description ? (
								<div className='p-2 '>
									<label htmlFor='fullname' className='p-1 text-xs font-bold'>
										Description:
										<br />
									</label>
									<span className='line-clamp-5 max-w-[200px] text-sm font-normal'>{selectedProduct?.description}</span>
								</div>
							) : (
								''
							)}
							<div className='p-2 w-full'>
								<label htmlFor='fullname' className='p-1 text-xs font-bold'>
									Prix:
									<br />
								</label>
								<span className='line-clamp-5 max-w-[200px] text-lg font-bold text-[#00a863]'>{selectedProduct?.price} DZD</span>
							</div>
						</div>
					</div>
				</div>
				<div className={orderIsLoading ? 'blur-sm w-full p-4' : 'w-full p-4'}>
					<button className='font-bold bg-[#00a863] text-white shadow-sm px-4 py-2 rounded' type='submit' form='order'>
						Confirmer La Commande
					</button>
				</div>
				{orderIsLoading ? <div className='absolute w-full h-full top-0 left-0 flex items-center justify-center font-bold text-xl '>Sending order...</div> : ''}
			</Modal>
		</div>
	);
};
export default Home;
