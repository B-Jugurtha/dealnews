import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sessionAtom } from '../services/atoms';

type Props = {};

export const Logout = (props: Props) => {
	const [session, setSession] = useAtom(sessionAtom);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}user/logout`, {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				Authorization: `Token ${session.token}`,
				accept: 'application/json',
			}),
		}).then((res) => {
			if (res.ok || res.status === 401) {
				setSession({
					addresse: '',
					firstName: '',
					lastName: '',
					loggedin: false,
					mail: '',
					phone: '',
					token: '',
					userId: '',
				});
				navigate('/');
			} else {
				console.log('error');
			}
		});
	}, []);

	return <div className='flex'></div>;
};
export default Logout;
