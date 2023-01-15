import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import AboutUs from './pages/aboutus';
import Home from './pages/home';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';

const queryClient = new QueryClient();

function Layout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='signup' element={<Signup />} />
					<Route path='login' element={<Login />} />
					<Route path='logout' element={<Logout />} />
					<Route path='aboutus' element={<AboutUs />} />
				</Route>
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
