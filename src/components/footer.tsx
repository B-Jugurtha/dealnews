import React, { useEffect } from 'react';

type Props = {};

const Footer = (props: Props) => {
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}aboutus/`)
			.then((res) => res.json())
			.then((aboutus) => {
				console.log(aboutus);
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
			<div className='bg-gray-200 w-full p-8'>
				<div className='lg:max-w-screen-lg m-auto flex items-center'>
					<div className='flex flex-col gap-2 text-gray-800'>
						<span className='text-2xl '>
							<b>Dealnews</b>
						</span>
						<span>
							<b>Address:</b>
							<p className='inline-block ml-2'>1500s, when an unknown printer took a galley of type and scrambled it to make a typ.</p>
						</span>
						<span className='inline-block'>
							<b>Phone:</b>
							<p className='inline-block ml-2'>+213 99 99 88 88 11</p>
						</span>
						<span className='inline-block'>
							<b>Email:</b>
							<p className='inline-block ml-2'>contact@wassitcom.com</p>
						</span>
					</div>
					<div className='flex-1'></div>
					<div className='p-4'>
						<img src={require('../assets/img/logo.png')} alt='Ad' className='max-w-[200px] max-h-[200px]' />
					</div>
				</div>
			</div>
			<div className='bg-[#214b82] p-1 text-xs text-white'>© Copyright 2023 DealNews. All rights reserved.</div>
		</div>
	);
};

export default Footer;
