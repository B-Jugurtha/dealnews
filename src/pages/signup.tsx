import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, Session } from '../modals/modals';
import { productsListAtom, productsPageAtom, sessionAtom } from '../services/atoms';

type Props = {};

export const Signup = (props: Props) => {
	const navigate = useNavigate();
	const [session, setSession] = useAtom(sessionAtom);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');
	const [errors, setErrors] = useState({
		firstName: false,
		lastName: false,
		phone: false,
		address: false,
		mail: false,
		password: false,
		cPassword: false,
	});
	const [signupLoading, setSignupLoading] = useState(false);
	const handleSubmit = (e: React.SyntheticEvent) => {
		if (!signupLoading) {
			setSignupLoading(true);
			e.preventDefault();
			if (password != cPassword) {
				setErrors({ ...errors, cPassword: true });
				return;
			}
			let newUser = {
				first_name: firstName,
				last_name: lastName,
				phone_number: phone,
				address: address,
				email: mail,
				password: password,
			};
			fetch(`${process.env.REACT_APP_API_URL}user/register`, {
				method: 'POST',

				headers: {
					'Content-Type': 'application/json',
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(newUser),
			})
				.then((res) => {
					if (res.ok) {
						console.log('is ok');
					} else {
						console.log('its not');
					}
					res.json().then((session) => {
						if (session.Token) {
							let s: Session = {
								firstName: session.user.first_name || '',
								lastName: session.user.last_name || '',
								addresse: session.user.address || '',
								loggedin: true,
								mail: session.user.email || '',
								phone: session.user.phone_number || '',
								userId: session.user.id || '',
								token: session.Token || '',
							};
							setSession(s);
							navigate('/');
						} else {
							console.log(session);
							navigate('/404');
						}
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	return (
		<div>
			<form action='submit' className='flex flex-col items-center text-left' onSubmit={handleSubmit} id='order'>
				<div className='p-2 '>
					<label htmlFor='lastName' className='p-1 text-xs '>
						Nom:
						<br />
					</label>
					<input
						required
						value={lastName}
						onChange={(e) => {
							setErrors({ ...errors, lastName: false });
							setLastName(e.target.value);
						}}
						type='text'
						name='lastName'
						id='lastName'
						placeholder='Nom'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.lastName ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquer votre nom.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='firstName' className='p-1 text-xs '>
						Prénom:
						<br />
					</label>
					<input
						required
						value={firstName}
						onChange={(e) => {
							setErrors({ ...errors, firstName: false });
							setFirstName(e.target.value);
						}}
						type='text'
						name='firstName'
						id='firstName'
						placeholder='Prénom'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.firstName ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquer votre prénom.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='phone' className='p-1 text-xs '>
						Numéro de téléphone:
						<br />
					</label>
					<input
						required
						value={phone}
						onChange={(e) => {
							setErrors({ ...errors, phone: false });
							setPhone(e.target.value);
						}}
						type='tel'
						name='phone'
						id='phone'
						autoComplete='+2137123456'
						placeholder='Numéro de téléphone'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.phone ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquer un numéro de téléphone correct.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='address' className='p-1 text-xs '>
						Adresse:
						<br />
					</label>
					<textarea
						required
						value={address}
						onChange={(e) => {
							setErrors({ ...errors, address: false });
							setAddress(e.target.value);
						}}
						name='address'
						id='address'
						autoComplete='13, Rue du 1er nomvembre 1954, Alger, Alger'
						placeholder='Numéro de téléaddress'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.address ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquer votre adresse de livraison.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='mail' className='p-1 text-xs '>
						Email:
						<br />
					</label>
					<input
						required
						value={mail}
						onChange={(e) => {
							setErrors({ ...errors, mail: false });
							setMail(e.target.value);
						}}
						autoComplete='email@example.com'
						type='email'
						name='mail'
						id='mail'
						placeholder='Email'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.mail ? <div className='text-red-500 text-xs p-1'>*Veuillez indiquer une adresse mail correct.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='password' className='p-1 text-xs '>
						Mot de passe :
						<br />
					</label>
					<input
						required
						value={password}
						onChange={(e) => {
							setErrors({ ...errors, password: false });
							setPassword(e.target.value);
						}}
						type='password'
						name='password'
						id='password'
						autoComplete='new-password'
						placeholder='Mot de passe'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.password ? <div className='text-red-500 text-xs p-1'>*Veuillez choisir un solide mot de passe.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='cpassword' className='p-1 text-xs '>
						Confirmez votre mot de passe :
						<br />
					</label>
					<input
						required
						value={cPassword}
						onChange={(e) => {
							setErrors({ ...errors, cPassword: false });
							setCPassword(e.target.value);
						}}
						autoComplete='new-password'
						type='password'
						name='cPassword'
						id='cPassword'
						placeholder='Confirmer mot de passe'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.cPassword ? <div className='text-red-500 text-xs p-1'>*Veuillez verifier votre mot de passe</div> : ''}
				</div>
				<div className='flext items-center justify-center p-2'>
					<button className='font-bold px-4 py-2 bg-[#00a863] text-white shadow-md hover:cursor-pointer' type='submit'>
						S'inscrire
					</button>
				</div>
				{/* <div className='p-2 '>
					<label htmlFor='phone' className='p-1 text-xs '>
						Phone Number:
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
						placeholder='Phone number'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.phone ? <div className='text-red-500 text-xs p-1'>*please provide your phone number.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='address' className='p-1 text-xs '>
						Address:
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
						placeholder='Address'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
					{errors.address ? <div className='text-red-500 text-xs p-1'>*please provide your address.</div> : ''}
				</div>
				<div className='p-2 '>
					<label htmlFor='description' className='p-1 text-xs '>
						Description:
						<br />
					</label>
					<textarea
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						name='desc'
						id='desc'
						placeholder='Description'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
				</div> */}
			</form>
		</div>
	);
};
export default Signup;
