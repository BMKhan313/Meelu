import React, { useState, } from 'react';
import { useFormik } from 'formik';

import moment from 'moment';
// import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/light.css';
// ** Axios Imports
// import Axios from 'axios';
import Select from 'react-select';
import Spinner from '../../../../components/bootstrap/Spinner';

// import baseURL from '../../../../baseURL/baseURL';
// import Icon from '../../../../components/icon/Icon';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
	CardHeader,

	// eslint-disable-next-line no-unused-vars
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
// import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';
// import showNotification from '../../../../components/extras/showNotification';

const validate = (values) => {
	const errors = {};

	if (!values.employee_id) {
		errors.employee_id = 'Required';
	}
	if (!values.type) {
		errors.type = 'Required';
	}
	if (!values.date) {
		errors.date = 'Required';
	}
	if (!values.amount > 0) {
		errors.amount = 'Required';
	}
	if (!values.account_id) {
		errors.account_id = 'Required';
	}

	return errors;
};

const Add = () => {
	const [state, setState] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);
	const typeOptions = [
		{ id: 1, value: 1, label: 'Advance Salary' },
		{ id: 2, value: 2, label: 'Loan' },
	];
    const typeOptions2 = [
		{ id: 1, value: 1, label: 'Advance Salary2' },
		{ id: 2, value: 2, label: 'Loan2' },
	];
	// const [cashAccountsOptions, setCashAccountsOptions] = useState([]);
	// const [crAccountLoading, setCrAccountLoading] = useState(true);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState(null);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	// const _titleSuccess = (
	// 	<span className='d-flex align-items-center'>
	// 		<Icon icon='Info' size='lg' className='me-1' />
	// 		<span>Record Saved Successfully</span>
	// 	</span>
	// );
	// const _titleError = (
	// 	<span className='d-flex align-items-center'>
	// 		<Icon icon='Info' size='lg' className='me-1' />
	// 		<span>Error Saving Record </span>
	// 	</span>
	// );

	// eslint-disable-next-line no-unused-vars
	// const submitForm = (myFormik) => {
	// 	const url = `${baseURL}/payAdvanceSalaryOrLoan`;

	// 	const options = {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json;charset=UTF-8',
	// 		},
	// 		body: JSON.stringify(myFormik.values),
	// 	};
	// 	fetch(url, options)
	// 		.then((response) => response.json())
	// 		.then((res) => {
	// 			setIsLoading(false);

	// 			if (res.status === 'ok') {
	// 				props.refreshTableRecordsHandler(props.refreshTableRecords + 1);
	// 				showNotification(_titleSuccess, res.message, 'success');
	// 				setState(false);
	// 				myFormik.resetForm();
	// 				setLastSave(moment());
	// 			} else {
	// 				showNotification(_titleError, res.message, 'danger');
	// 				console.log('Error');
	// 			}
	// 		});
	// };

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus('lg');
		setFullScreenStatus(null);
		setAnimationStatus(true);
		setHeaderCloseStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			// employee_id: '',
			// amount: '',
			// date: moment().format('DD/MM/YY'),
			type: '',
            type2: '',
           
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		// submitForm(formik);
		setLastSave(moment());
	};
	// const [employeeOptions, setEmployeeOptions] = useState([]);
	// const [employeeOptionsLoading, setDepartmentsOptionsLoading] = useState(true);

	// useEffect(() => {
	// 	setDepartmentsOptionsLoading(true);
	// 	setCrAccountLoading(true);

	// 	Axios.get(`${baseURL}/getEmployees`)
	// 		.then((response) => {
	// 			const rec = response.data.employees.map(({ id, name }) => ({
	// 				id,
	// 				value: id,
	// 				label: name,
	// 			}));
	// 			setEmployeeOptions(rec);
	// 			setDepartmentsOptionsLoading(false);
	// 		})
	// 		.catch((err) => console.log(err));

	// 	Axios.get(`${baseURL}/getCashAccounts`)
	// 		.then((response) => {
	// 			const rec = response.data.coaAccounts.map(({ id, name, code }) => ({
	// 				id,
	// 				value: id,
	// 				label: `${code}-${name}`,
	// 			}));
	// 			setCashAccountsOptions(rec);
	// 			setCrAccountLoading(false);
	// 		})
	// 		.catch((err) => console.log(err));

	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<>
			<Button
				color='danger'
				isLight
				icon='Add'
				hoverShadow='default'
				onClick={() => {
					initialStatus();

					setState(true);
					setStaticBackdropStatus(true);
				}}>
				Advance Salary/ Loan
			</Button>

			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size={sizeStatus}
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<CardLabel icon='Money'>
						<ModalTitle id='exampleModalLabel'>Add</ModalTitle>
					</CardLabel>
				</ModalHeader>

				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<div className='row g-4'>
								<CardBody className='col-md-6 border-end'>
									<div className='row g-4'>
										{/* <div className='col-md-12'>
											<FormGroup
												id='employee_id'
												label='Employee'
												className='col-md-12'>
												<Select
													className='col-md-12'
													// isClearable
													classNamePrefix='select'
													options={employeeOptions}
													isLoading={employeeOptionsLoading}
													value={
														formik.values.employee_id !== null &&
														employeeOptions.find(
															(c) =>
																c.value ===
																formik.values.employee_id,
														)
													}
													// value={formik.values.mouza_id}
													onChange={(val) => {
														formik.setFieldValue('employee_id', val.id);
													}}
													isValid={formik.isValid}
													isTouched={formik.touched.employee_id}
													invalidFeedback={formik.errors.employee_id}
													validFeedback='Looks good!'
												/>
											</FormGroup>
											{formik.errors.employee_id && (
												// <div className='invalid-feedback'>
												<p
													style={{
														color: 'red',
													}}>
													{formik.errors.employee_id}
												</p>
											)}
										</div> */}
										<div className='col-md-12'>
											<FormGroup id='type' label='Type' className='col-md-12'>
												<Select
													className='col-md-12'
													// isClearable
													classNamePrefix='select'
													options={typeOptions}
													value={
														formik.values.type !== null &&
														typeOptions.find(
															(c) => c.value === formik.values.type,
														)
													}
													// value={formik.values.mouza_id}
													onChange={(val) => {
														formik.setFieldValue('type', val.id);
													}}
													isValid={formik.isValid}
													isTouched={formik.touched.type}
													invalidFeedback={formik.errors.type}
													validFeedback='Looks good!'
												/>
											</FormGroup>
											{formik.errors.type && (
												// <div className='invalid-feedback'>
												<p
													style={{
														color: 'red',
													}}>
													{formik.errors.type}
												</p>
											)}
										</div>
                                        <div className='col-md-12'>
											<FormGroup id='type2' label='Type2' className='col-md-12'>
												<Select
													className='col-md-12'
													// isClearable
													classNamePrefix='select'
													options={typeOptions2}
													value={
														formik.values.type2 !== null &&
														typeOptions2.find(
															(c) => c.value === formik.values.type2,
														)
													}
													// value={formik.values.mouza_id}
													onChange={(val) => {
														formik.setFieldValue('type2', val.id);
													}}
													isValid={formik.isValid}
													isTouched={formik.touched.type2}
													invalidFeedback={formik.errors.type2}
													validFeedback='Looks good!'
												/>
											</FormGroup>
											{formik.errors.type2 && (
												// <div className='invalid-feedback'>
												<p
													style={{
														color: 'red',
													}}>
													{formik.errors.type2}
												</p>
											)}
										</div>
                                  
										{/* <div className='col-md-12'>
											<FormGroup id='account_id' label='Cr Account'>
												<Select
													className='col-md-12 '
													isClearable
													classNamePrefix='select'
													options={cashAccountsOptions}
													isLoading={crAccountLoading}
													value={
														formik.values.account_id !== null &&
														cashAccountsOptions.find(
															(c) =>
																c.value ===
																formik.values.account_id,
														)
													}
													onChange={(val) => {
														formik.setFieldValue('account_id', val.id);
													}}
													onBlur={formik.handleBlur}
													isValid={formik.isValid}
													isTouched={formik.touched.account_id}
													invalidFeedback={formik.errors.account_id}
													validFeedback='Looks good!'
												/>
											</FormGroup>
											{formik.errors.account_id && (
												// <div className='invalid-feedback'>
												<p
													style={{
														color: 'red',
													}}>
													{formik.errors.account_id}
												</p>
											)}
										</div> */}
									</div>
									<br />
									<div className='row g-4'>
										{/* <div className='col-md-6'>
											<FormGroup id='amount' label='Amount'>
												<Input
													type='number'
													min='0'
													onWheel={(e) => e.target.blur()}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.amount}
													isValid={formik.isValid}
													isTouched
													invalidFeedback={formik.errors.amount}
													validFeedback='Looks good!'
												/>
											</FormGroup>
											<br />
										</div> */}
										{/* <div className='col-md-6'>
											<FormGroup label='Date'>
												<Flatpickr
													className='form-control'
													value={formik.values.date}
													// eslint-disable-next-line react/jsx-boolean-value

													options={{
														dateFormat: 'd/m/y',
														allowInput: true,
													}}
													onChange={(date, dateStr) => {
														formik.setFieldValue('date', dateStr);
													}}
													onClose={(date, dateStr) => {
														formik.setFieldValue('date', dateStr);
													}}
													id='default-picker'
												/>
											</FormGroup>
											{formik.errors.date && (
												// <div className='invalid-feedback'>
												<p
													style={{
														color: 'red',
													}}>
													{formik.errors.date}
												</p>
											)}
										</div> */}
									</div>
								</CardBody>
							</div>
							<CardFooter>
								<CardFooterLeft>
									<Button
										type='reset'
										color='info'
										isOutline
										onClick={formik.resetForm}>
										Reset
									</Button>
								</CardFooterLeft>
								<CardFooterRight>
									<Button
										icon={isLoading ? null : 'Save'}
										isLight
										color={lastSave ? 'info' : 'success'}
										isDisable={isLoading}
										onClick={formik.handleSubmit}>
										{isLoading && <Spinner isSmall inButton />}
										{isLoading
											? (lastSave && 'Saving') || 'Saving'
											: (lastSave && 'Save') || 'Save'}
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setState(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default Add;