/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import moment from 'moment';
import ReactSelect, { createFilter } from 'react-select';
import PropTypes from 'prop-types';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';
import Spinner from '../../../../components/bootstrap/Spinner';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import showNotification from '../../../../components/extras/showNotification';
import { _titleSuccess, _titleError } from '../../../../notifyMessages/erroSuccess';

import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';

const validate = (values) => {
	let errors = {};
	// if (values.childArray.length === 0) {
	// 	errors.childArray = <p>Insert at leat a single item!</p>;
	// }
	if (!values.po_no) {
		errors.po_no = 'Required';
	}
	if (!values.supplier_id) {
		errors.supplier_id = 'Required';
	}
	// if (values.childArray.length === 0) {
	// 	errors.childArray = (
	// 		<p className='col-md-7' style={{ marginTop: 4, textAlign: 'left', color: 'red' }}>
	// 			Add at least one Item
	// 		</p>
	// 	);
	// }
	values.childArray.forEach((data, index) => {
		if (!data.item_id) {
			errors = {
				...errors,
				[`childArray[${index}]item_id`]: 'Required!',
			};
		}

		if (!data.quantity > 0) {
			errors = {
				...errors,
				[`childArray[${index}]quantity`]: 'Required',
			};
		}
	});
	// eslint-disable-next-line no-console
	console.log('Errr', errors);
	return errors;
};
const Add = ({ refreshTableData }) => {
	const [state, setState] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);
	const [kitOptions, setKitOptions] = useState([]);
	const [kitOptionsLoading, setKitOptionsLoading] = useState(false);
	const [makeOptions, setMakeOptions] = useState();
	const [makeOptionsLoading, setMakeOptionsLoading] = useState(false);
	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	const [supplierOptions, setSupplierOptions] = useState([]);
	const [supplierOptionsLoading, setSupplierOptionsLoading] = useState(false);
	const [branchOptions, setBranchOptions] = useState([]);
	const [branchOptionsLoading, setBranchOptionsLoading] = useState(false);
	const [supplierDropDown, setSupplierDropDown] = useState([]);
	const [supplierDropDownLoading, setSupplierDropDownLoading] = useState([]);
	const [poNo, setPoNo] = useState('');
	const [poNoLoading, setPoNoLoading] = useState(false);
	const [storeOptions, setStoreOptions] = useState([]);
	const [storeLoading, setStoreLoading] = useState(false);

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setFullScreenStatus(null);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			po_no: '',
			supplier_id: '',
			store_id: '',
			status: '',
			is_received: 0,
			request_date: '',
			total: 0,
			discount: '',
			tax: '',
			total_after_tax: '',
			tax_in_figure: '',
			total_after_discount: '',
			remarks: '',
			// quantity: 0,
			// childArray: [],
			childArray: [
				{
					item_id: '',
					quantity: '',
					received_quantity: 0,
					purchase_price: '',
					sale_price: '',
					amount: '',
					remarks: '',
				},
			],
		},
		validate,
		onSubmit: () => {
			// console.log('formik values', formik.values);
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		console.log('formik values', formik.values);
		submitForm(formik);
	};
	const removeRow = (i) => {
		formik.setFieldValue('childArray', [
			...formik.values.childArray.slice(0, i),
			...formik.values.childArray.slice(i + 1),
		]);
	};
	const submitForm = (myFormik) => {
		Axios.post(`${baseURL}/addPurchaseOrder`, myFormik.values)
			.then((res) => {
				console.log('values', res);
				if (res.data.status === 'ok') {
					formik.resetForm();
					showNotification(_titleSuccess, res.data.message, 'success');
					setState(false);
					refreshTableData();
					setIsLoading(false);
				} else {
					setIsLoading(false);
					showNotification(_titleError, res.data.message, 'Danger');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				showNotification(_titleError, err.message, 'Danger');

				setIsLoading(false);
			});
	};
	useEffect(() => {
		Axios.get(`${baseURL}/getLatestpono`)
			.then((response) => {
				formik.setFieldValue('po_no', response.data.po_no);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');

					// Cookies.remove('userToken');
					// navigate(`/${demoPages.login.path}`, { replace: true });
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.po_no]);

	useEffect(() => {
		Axios.get(`${baseURL}/getSupplierdropdown`)
			.then((response) => {
				const rec = response.data.suppliers.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setSupplierDropDown(rec);
				setSupplierDropDownLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');

					// Cookies.remove('userToken');
					// navigate(`/${demoPages.login.path}`, { replace: true });
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.supplier_id]);
	useEffect(() => {
		Axios.get(`${baseURL}/getStoredropdown`)
			.then((response) => {
				// console.log('store', response.data);
				const rec = response.data.store.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setStoreOptions(rec);
				setStoreLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.message, 'Danger');

					// Cookies.remove('userToken');
					// navigate(`/${demoPages.login.path}`, { replace: true });
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.supplier_id]);
	useEffect(() => {
		Axios.get(`${baseURL}/kitItemDropdown`)
			.then((response) => {
				// console.log('bmmmmkkkk::', response.data);
				const rec = response.data.data.map(({ id, machine_part_oem_part }) => ({
					id,
					value: id,
					label: `${machine_part_oem_part.oem_part_number.number1}-${machine_part_oem_part.machine_part.name}`,
				}));
				setKitOptions(rec);
				setKitOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {});
		// eslint-disable-next-line no-console
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='col-auto'>
			<div className='col-auto'>
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
					Add Purchase Order
				</Button>
			</div>
			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size='xl'
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<CardLabel icon='Add'>
						<ModalTitle id='exampleModalLabel'>Add Purchase Order</ModalTitle>
					</CardLabel>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardBody>
								<div className='row g-2  d-flex justify-content-start'>
									<div className='col-md-2'>
										<FormGroup id='po_no' label='PO NO' className='col-md-12'>
											<Input
												readOnly
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.po_no}
												isValid={formik.isValid}
												isTouched={formik.touched.po_no}
												invalidFeedback={formik.errors.po_no}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup
											id='supplier_id'
											label='Supplier'
											className='col-md-12'>
											<ReactSelect
												className='col-md-12'
												isClearable
												isLoading={supplierDropDownLoading}
												options={supplierDropDown}
												value={
													formik.values.supplier_id
														? supplierDropDown?.find(
																(c) =>
																	c.value === formik.values.label,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'supplier_id',
														val !== null && val.id,
													);
												}}
												invalidFeedback={formik.errors.supplier_id}
												validFeedback='Looks good!'
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
										{formik.errors.supplier_id && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.supplier_id}
											</p>
										)}
									</div>
									{/* <div className='col-md-3'>
										<FormGroup label='Delivery Place' id='store_id'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={storeOptions}
												isLoading={storeLoading}
												isClearable
												value={
													formik.values.store_id
														? storeOptions.find(
																(c) =>
																	c.value ===
																	formik.values.store_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'store_id',
														val !== null && val.id,
													);
												}}
												isValid={formik.isValid}
												isTouched={formik.touched.store_id}
												invalidFeedback={formik.errors.store_id}
												validFeedback='Looks good!'
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div> */}
									<div className='col-md-2'>
										<FormGroup label='Store' id='store_id'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={storeOptions}
												isLoading={storeLoading}
												isClearable
												value={
													formik.values.store_id
														? storeOptions.find(
																(c) =>
																	c.value ===
																	formik.values.store_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'store_id',
														val !== null && val.id,
													);
												}}
												isValid={formik.isValid}
												isTouched={formik.touched.store_id}
												invalidFeedback={formik.errors.store_id}
												validFeedback='Looks good!'
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div>
								</div>
								<div className='row g-2 mt-2  d-flex justify-content-start'>
									<div className='col-md-2'>
										<FormGroup id='status' label='Status' className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.status}
												isValid={formik.isValid}
												isTouched={formik.touched.status}
												invalidFeedback={formik.errors.status}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{/* {formik.errors[`childArray[${index}]quantity`] && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
													textAlign: 'left',
													marginTop: 3,
												}}>
												{formik.errors[`childArray[${index}]quantity`]}
											</p>
										)} */}
									</div>
									<div className='col-md-2'>
										<FormGroup id='total' label='Total' className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.total}
												isValid={formik.isValid}
												isTouched={formik.touched.total}
												invalidFeedback={formik.errors.total}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup id='tax' label='Tax' className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.tax}
												isValid={formik.isValid}
												isTouched={formik.touched.tax}
												invalidFeedback={formik.errors.tax}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup
											id='total_after_tax'
											label='Total After Taxt'
											className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.total_after_tax}
												isValid={formik.isValid}
												isTouched={formik.touched.total_after_tax}
												invalidFeedback={formik.errors.total_after_tax}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup
											id='tax_in_figure'
											label='Tax in figure'
											className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.tax_in_figure}
												isValid={formik.isValid}
												isTouched={formik.touched.tax_in_figure}
												invalidFeedback={formik.errors.tax_in_figure}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
								</div>
								<div className='row g-2 mt-2  d-flex justify-content-start'>
									<div className='col-md-2'>
										<FormGroup
											id='discount'
											label='Discount'
											className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.discount}
												isValid={formik.isValid}
												isTouched={formik.touched.discount}
												invalidFeedback={formik.errors.discount}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup
											id='total_after_discount'
											label='Total after discount'
											className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.total_after_discount}
												isValid={formik.isValid}
												isTouched={formik.touched.total_after_discount}
												invalidFeedback={formik.errors.total_after_discount}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup id='request_date' label='Request Date'>
											<Input
												type='date'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.request_date}
												isValid={formik.isValid}
												isTouched={formik.touched.request_date}
												invalidFeedback={formik.errors.request_date}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup
											id='remarks'
											label='Remarks'
											className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.remarks}
												isValid={formik.isValid}
												isTouched={formik.touched.remarks}
												invalidFeedback={formik.errors.remarks}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.remarks && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.remarks}
											</p>
										)}
									</div>
								</div>
								<hr />
								{/* <CardBody className='table-responsive'> */}
								<table className='table text-center table-modern'>
									<thead>
										<tr className='row'>
											<th className='col-md-2'>Items</th>
											{/* <th className='col-md-2'>Unit</th> */}
											{/* <th className='col-md-1'>Existing Qty</th> */}
											<th className='col-md-1'>Quantity</th>
											<th className='col-md-1'>Received Qty</th>
											<th className='col-md-2'>purchase_price</th>
											<th className='col-md-2'>sale_price</th>
											<th className='col-md-2'>amount</th>
											<th className='col-md-1'>Remarks</th>
											<th className='col-md-1'>Remove</th>
										</tr>
										{/* {formik.errors.childArray && (
											// <div className='invalid-feedback'>
											<tr>{formik.errors.childArray}</tr>
										)} */}
									</thead>
									<tbody>
										{formik.values.childArray.length > 0 &&
											formik.values.childArray.map((items, index) => (
												<tr className='row' key={items.index}>
													<td className='col-md-2'>
														<FormGroup
															label=''
															id={`childArray[${index}].item_id`}>
															<ReactSelect
																className='col-md-12'
																classNamePrefix='select'
																options={kitOptions}
																isLoading={kitOptionsLoading}
																isClearable
																value={
																	formik.values.childArray[index]
																		.item_id
																		? kitOptions.find(
																				(c) =>
																					c.value ===
																					formik.values
																						.childArray[
																						index
																					].item_id,
																		  )
																		: null
																}
																onChange={(val) => {
																	formik.setFieldValue(
																		`childArray[${index}].item_id`,
																		val !== null && val.id,
																	);
																}}
																isValid={formik.isValid}
																isTouched={formik.touched.item_id}
																invalidFeedback={
																	formik.errors[
																		`childArray[${index}].item_id`
																	]
																}
																validFeedback='Looks good!'
																filterOption={createFilter({
																	matchFrom: 'start',
																})}
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]item_id`
														] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`childArray[${index}]item_id`
																	]
																}
															</p>
														)}
													</td>
													<td className='col-md-1'>
														<FormGroup
															id={`childArray[${index}].quantity`}
															label=''
															type='number'
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={items.quantity}
																isValid={formik.isValid}
																isTouched={formik.touched.quantity}
																invalidFeedback={
																	formik.errors.quantity
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]quantity`
														] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`childArray[${index}]quantity`
																	]
																}
															</p>
														)}
													</td>
													<td className='col-md-1'>
														<FormGroup
															id={`childArray[${index}].received_quantity`}
															label=''
															type='number'
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={items.received_quantity}
																isValid={formik.isValid}
																isTouched={
																	formik.touched.received_quantity
																}
																invalidFeedback={
																	formik.errors.received_quantity
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]received_quantity`
														] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`childArray[${index}]received_quantity`
																	]
																}
															</p>
														)}
													</td>
													<td className='col-md-2'>
														<FormGroup
															id={`childArray[${index}].purchase_price`}
															label=''
															type='number'
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={items.purchase_price}
																isValid={formik.isValid}
																isTouched={
																	formik.touched.purchase_price
																}
																invalidFeedback={
																	formik.errors.purchase_price
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]purchase_price`
														] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`childArray[${index}]purchase_price`
																	]
																}
															</p>
														)}
													</td>
													<td className='col-md-2'>
														<FormGroup
															id={`childArray[${index}].sale_prices`}
															label=''
															type='number'
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={items.sale_prices}
																isValid={formik.isValid}
																isTouched={
																	formik.touched.sale_prices
																}
																invalidFeedback={
																	formik.errors.sale_prices
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]sale_prices`
														] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`childArray[${index}]sale_prices`
																	]
																}
															</p>
														)}
													</td>
													<td className='col-md-2'>
														<FormGroup
															id={`childArray[${index}].amount`}
															label=''
															type='number'
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={items.amount}
																isValid={formik.isValid}
																isTouched={formik.touched.amount}
																invalidFeedback={
																	formik.errors.amount
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]amount`
														] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`childArray[${index}]amount`
																	]
																}
															</p>
														)}
													</td>
													<td className='col-md-1'>
														<FormGroup
															id={`childArray[${index}].remarks`}
															label=''
															type='number'
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={items.remarks}
																isValid={formik.isValid}
																isTouched={formik.touched.remarks}
																invalidFeedback={
																	formik.errors.remarks
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]remarks`
														] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`childArray[${index}]remarks`
																	]
																}
															</p>
														)}
													</td>

													<td className='col-md-1 mt-1'>
														<Button
															isDisable={
																formik.values.childArray.length ===
																1
															}
															icon='cancel'
															color='danger'
															onClick={() => removeRow(index)}
														/>
													</td>
												</tr>
											))}
									</tbody>
								</table>
								<div className='row g-4'>
									<div className='col-md-4'>
										<Button
											color='primary'
											icon='add'
											onClick={() => {
												formik.setFieldValue('childArray', [
													...formik.values.childArray,
													{
														name: '',
														quantity: '',
													},
												]);
											}}>
											Add
										</Button>
									</div>
								</div>
							</CardBody>
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
										className='me-3'
										icon={isLoading ? null : 'Save'}
										isLight
										color='success'
										isDisable={isLoading}
										onClick={formik.handleSubmit}>
										{isLoading && <Spinner isSmall inButton />}
										{isLoading ? 'Saving' : 'Save'}
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
		</div>
	);
};
Add.propTypes = {
	refreshTableData: PropTypes.func.isRequired,
};

export default Add;