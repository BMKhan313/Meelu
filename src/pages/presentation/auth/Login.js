// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import moment from 'moment';
import showNotification from '../../../components/extras/showNotification';
import { _titleSuccess, _titleError } from '../../../notifyMessages/erroSuccess';

import subDirForNavigation from '../../../baseDirectory/subDirForNavigation';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo.png';
import useDarkMode from '../../../hooks/useDarkMode';
import baseURL from '../../../baseURL/baseURL';
import Spinner from '../../../components/bootstrap/Spinner';
import { updateCookies } from '../../allModules/redux/tableCrud/index';

// eslint-disable-next-line react/prop-types
const LoginHeader = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

const Login = () => {
	const store = useSelector((state) => state.tableCrud);

	useEffect(() => {
		try {
			if (store.cookies?.userToken !== undefined) {
				const fetchData = async () => {
					const data = await JSON.stringify(store.cookies.userToken);
					const name = await JSON.stringify(store.cookies.name);
					// eslint-disable-next-line camelcase
					const role_name = await JSON.stringify(store.cookies.role_name);
					// eslint-disable-next-line camelcase
					const role_id = await JSON.stringify(store.cookies.role_id);
					Cookies.set('userToken', data);
					Cookies.set('name', name);
					Cookies.set('role_name', role_name);
					Cookies.set('role_id', role_id);
				};
				fetchData();
			}
		} catch (error) {
			console.log(error, error.message);
		}
	}, [store.cookies]);
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars

	const { darkModeStatus } = useDarkMode();

	// eslint-disable-next-line no-unused-vars
	const [usernameInput, setUsernameInput] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [isNewUser, setIsNewUser] = useState(0);
	const [lastSave, setLastSave] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleOnClick = (e) => {
		setIsLoading(true);

		e.preventDefault();
		if (email === '') {
			toast('Please Provide Email Address!');
		} else if (password === '') {
			toast('Please Provide Password!');
		} else if (email !== '' && password !== '') {
			fetch(`${baseURL}/login`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setIsLoading(false);
					if (data.status === 'ok') {
						dispatch(
							updateCookies([data.token !== null ? data.token : 'null', 'userToken']),
						);
						dispatch(
							updateCookies([
								data.role.name !== null ? data.role.name : 'null',
								'name',
							]),
							updateCookies([
								data.role.role_name !== null ? data.role.role_name : 'null',
								'role_name',
							]),
							updateCookies([
								data.role.role_id !== null ? data.role.role_id : 'null',
								'role_id',
							]),
						);

						showNotification(_titleSuccess, 'Login Success', 'Success');

						navigate(`${subDirForNavigation}`, { replace: true });
						setLastSave(moment());
					} else {
						showNotification(_titleError, data.message, 'Danger');
					}

					setIsLoading(false);
				})
				.catch((err) => {
					setIsLoading(false);
					toast('Network Error');
					console.log(err);
				});
		} else {
			toast('Fill out fields correctly!');
		}
	};

	return (
		<PageWrapper
			title={isNewUser ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-success': !isNewUser, 'bg-info': !!isNewUser })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<img alt='Logo' src={Logo} width={200} />
									</Link>
								</div>

								<LoginHeader isNewUser={isNewUser} />

								<form className='row g-4'>
									{isNewUser ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your email'>
													<Input type='email' autoComplete='email' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Your name'>
													<Input autoComplete='given-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your surname'>
													<Input autoComplete='family-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='password'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={handleOnClick}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='login-username'
													isFloating
													label='Your email or username'>
													<Input
														autoComplete='username'
														onChange={(e) => setEmail(e.target.value)}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='login-password'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='password'
														onChange={(e) =>
															setPassword(e.target.value)
														}
													/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<Button
													icon={isLoading ? null : 'Login'}
													isDisable={isLoading}
													color='success'
													type='submit'
													className='w-100 py-3'
													onClick={handleOnClick}>
													{isLoading && <Spinner isSmall inButton />}
													{isLoading
														? (lastSave && 'Signing in') || 'Signing in'
														: (lastSave && 'Sign in') || 'Sign in'}
												</Button>
											</div>
										</>
									)}
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Powered by
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Koncept Solutions
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

Login.defaultProps = {
	isSignUp: false,
};

export default Login;
