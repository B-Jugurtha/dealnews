import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { aboutUsAtom } from '../services/atoms';

type Props = {};

const Footer = (props: Props) => {
	const [aboutus, setAboutus] = useAtom(aboutUsAtom);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}aboutus/`)
			.then((res) => res.json())
			.then((abts) => {
				setAboutus({
					address: abts.address,
					content: abts.content,
					email: abts.email,
					google_map_link: abts.google_map_link,
					logo: abts.logo,
					phone_number: abts.phone_number,
					title: abts.title,
				});
				// if (newProducts.results) {
				// 	console.log(newProducts.results);
				// 	setProducts([...products, ...newProducts.results]);
				// 	setProductsPage(productsPage + 1);
				// } else {
				// 	setProductsPage(0);
				// }
			});
	}, []);

	return (
		<div>
			<div className='bg-blue-400 w-full p-8'>
				<div className='lg:max-w-screen-lg m-auto flex items-center md:flex-row flex-col'>
					<div className='flex flex-col gap-2 text-gray-800'>
						<span className='text-2xl '>
							<b>Dealnews</b>
						</span>
						<span>
							<b>Address:</b>
							<p className='inline-block ml-2'>{aboutus.address}</p>
						</span>
						<span className='inline-block'>
							<b>Phone:</b>
							<p className='inline-block ml-2'>{aboutus.phone_number}</p>
						</span>
						<span className='inline-block'>
							<b>Email:</b>
							<p className='inline-block ml-2'>{aboutus.email}</p>
						</span>
					</div>
					<div className='md:flex-1'></div>
					<div className='p-4'>
						<img src={`${process.env.REACT_APP_API_URL}${aboutus.logo}`} alt='Ad' className='max-w-[200px] max-h-[200px]' />
					</div>
				</div>
			</div>
			<div className='bg-[#214b82] p-1 text-xs text-white'>© Copyright 2023. All rights reserved.</div>
		</div>
	);
};

export default Footer;
