import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCategory, ProductStore } from '../modals/modals';
import { aboutUsAtom, sessionAtom, storesAtom } from '../services/atoms';
import { getAllCategories } from '../services/ProductServices';
type Props = {};

const Header = (props: Props) => {
	const [aboutus, setAboutus] = useAtom(aboutUsAtom);
	const [stores, setStores] = useAtom(storesAtom);
	const {
		isLoading: categoriesIsLoading,
		error: categoriesError,
		data: categories,
	} = useQuery<ProductCategory[], Error>({
		queryKey: ['repoData'],
		queryFn: () => fetch(`${process.env.REACT_APP_API_URL}products/get-categories`).then((res) => res.json()),
	});
	const [session, setSession] = useAtom(sessionAtom);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}products/get-stores`).then((res) => {
			res.json().then((stores) => {
				setStores(stores);
			});
		});

		fetch(`${process.env.REACT_APP_API_URL}aboutus`)
			.then((res) => res.json())
			.then((aboutus) => {
				setAboutus({
					address: aboutus.address,
					content: aboutus.content,
					email: aboutus.email,
					google_map_link: aboutus.google_map_link,
					logo: aboutus.logo,
					phone_number: aboutus.phone_number,
					title: aboutus.title,
				});
			});
	}, []);

	return (
		<header className='w-full bg-[#2c65af] h-[60px] flex'>
			<a href='\' className='flex items-center justify-center w-fit h-full p-2'>
				<img src={`${process.env.REACT_APP_API_URL}${aboutus.logo}`} alt='Logo' className='mb-2 max-h-[50px]' />
			</a>
			<ul className='flex items-center mx-4'>
				<li className='px-4 h-full flex items-center font-medium text-sm text-white hover:bg-[#214b82] hover:cursor-pointer relative group'>
					<span className=''>Categories</span>
					<ul className='absolute top-[60px] left-0 text-black py-2 w-full bg-white z-50'>
						{!categoriesIsLoading && !categoriesError
							? categories?.map((cat, ix) => {
									return (
										<li key={ix} className='flex justify-between p-1 items-center capitalize text-[#2c65af] hover:bg-[#eff0f3] group-hover:block hidden'>
											{cat.categorie_name}
										</li>
									);
							  })
							: ''}
					</ul>
				</li>
				<li className='px-4 h-full flex items-center font-medium text-sm text-white hover:bg-[#214b82] hover:cursor-pointer relative group'>
					<span className=''>Stores</span>
					<ul className='absolute top-[60px] left-0 text-black py-2 w-full bg-white z-50'>
						{stores.map((brand, i) => {
							return (
								<li className='flex justify-between p-1 items-center capitalize text-[#2c65af] hover:bg-[#eff0f3] group-hover:block hidden' key={i}>
									{brand.original_store}
								</li>
							);
						})}
					</ul>
				</li>
				<li className='px-4 h-full flex items-center font-medium text-sm text-white hover:bg-[#214b82] hover:cursor-pointer'>
					<Link to='/aboutus'>About Us</Link>
				</li>
			</ul>
			<div className='flex-1'></div>
			{session.loggedin ? (
				<div className='px-4 h-full flex items-center font-medium text-sm text-white hover:bg-[#214b82] hover:cursor-pointer relative group'>
					<span className='p-4 max-w-[150px] truncate'>
						{session.lastName[0]}.{session.firstName}
					</span>
					<Link to='logout' className='absolute top-[60px] bg-white text-gray-700 p-4 font-bold hidden group-hover:block '>
						Déconnexion
					</Link>
				</div>
			) : (
				<>
					<div className='px-4 h-full flex items-center font-medium text-sm text-white hover:bg-[#214b82] hover:cursor-pointer'>
						<Link to='/login'>Se connecter</Link>
					</div>
					<div className='px-4 h-full flex items-center font-medium text-sm text-white hover:bg-[#214b82] hover:cursor-pointer'>
						<Link to='/signup'>S'inscrire</Link>
					</div>
				</>
			)}
		</header>
	);
};

export default Header;
