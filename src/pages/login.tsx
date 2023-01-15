import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, Session } from '../modals/modals';
import { productsListAtom, productsPageAtom, sessionAtom } from '../services/atoms';

type Props = {};

export const Login = (props: Props) => {
	const navigate = useNavigate();
	const [session, setSession] = useAtom(sessionAtom);
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState(false);
	const [loginLoading, setLoginLoading] = useState(false);
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setErrors(false);
		if (!loginLoading) {
			setLoginLoading(true);
			let login = {
				email: mail,
				password: password,
			};
			fetch(`${process.env.REACT_APP_API_URL}user/login`, {
				method: 'POST',

				headers: {
					'Content-Type': 'application/json',
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
				body: JSON.stringify(login),
			})
				.then((res) => {
					if (res.ok) {
						console.log('is ok');
					} else {
						console.log('its not');
						setErrors(true);
						return;
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
					<label htmlFor='mail' className='p-1 text-xs '>
						Email:
						<br />
					</label>
					<input
						required
						value={mail}
						onChange={(e) => {
							setMail(e.target.value);
						}}
						autoComplete='email@example.com'
						type='email'
						name='mail'
						id='mail'
						placeholder='Email'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
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
							setPassword(e.target.value);
						}}
						type='password'
						name='password'
						id='password'
						autoComplete='new-password'
						placeholder='Mot de passe'
						className='bg-gray-200 rounded focus:outline-0 px-2 py-1'
					/>
				</div>
				{errors ? <div className='p-2 text-center text-red-500 lowercase font-bold text-sm'>Email ou Mot de passe Incorrect</div> : ''}
				<div className='flext items-center justify-center p-2'>
					<button className='font-bold px-4 py-2 bg-[#00a863] text-white shadow-md hover:cursor-pointer' type='submit'>
						Se Connecter
					</button>
				</div>
			</form>
		</div>
	);
};
export default Login;
