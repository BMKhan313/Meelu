// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

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
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';

const validate = (values) => {
	let errors = {};

	if (!values.po_no) {
		errors.po_no = 'Required';
	}
	if (!values.supplier_id) {
		errors.supplier_id = 'Required';
	}
	if (!values.request_date) {
		errors.request_date = 'Required';
	}
	if (!values.childArray.length > 0) {
		errors.childArray = 'Choose Items In list';
	}

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
	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	const [supplierDropDown, setSupplierDropDown] = useState([]);
	const [supplierDropDownLoading, setSupplierDropDownLoading] = useState([]);
	// const [storeOptions, setStoreOptions] = useState([]);
	// const [storeLoading, setStoreLoading] = useState(false);

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
			is_cancel: 0,
			is_approve: 0,
			is_received: 0,
			request_date: '',
			// total: 0,
			// discount: '',
			// tax: '',
			// total_after_tax: '',
			// tax_in_figure: '',
			// total_after_discount: '',
			remarks: '',
			childArray: [
				{
					item_id: '',
					quantity: '',
					received_quantity: '',
					remarks: '',
				},
			],
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		submitForm(formik);
	};
	const removeRow = (i) => {
		formik.setFieldValue('childArray', [
			...formik.values.childArray.slice(0, i),
			...formik.values.childArray.slice(i + 1),
		]);
		console.log(formik.touched);
		console.log(formik.errors);
	};
	const submitForm = (myFormik) => {
		Axios.post(`${baseURL}/addPurchaseOrder`, myFormik.values)
			.then((res) => {
				// console.log('myformik', myFormik.values);
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
		if (state === true) {
			Axios.get(`${baseURL}/getLatestpono`)
				.then((response) => {
					console.log('po', response.data.po_no);
					formik.setFieldValue('po_no', response.data.po_no);
				})
				.catch((err) => {
					showNotification(_titleError, err.message, 'Danger');
					if (err.response.status === 401) {
						showNotification(_titleError, err.response.data.message, 'Danger');
					}
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

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
				}
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.supplier_id]);

	useEffect(() => {
		Axios.get(`${baseURL}/kitItemDropdown`)
			.then((response) => {
				const rec = response.data.data.map(({ id, machine_part_oem_part }) => ({
					id,
					value: id,
					label: `${machine_part_oem_part.oem_part_number.number1}-${machine_part_oem_part.machine_part.name}`,
				}));
				setKitOptions(rec);
				setKitOptionsLoading(false);
			})
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
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
												type='number'
												readOnly
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.po_no}
												isValid={formik.isValid}
												isTouched={formik.touched.po_no}
												invalidFeedback={formik.errors.po_no}
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
									{/* 
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
												
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div> */}
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
											/>
										</FormGroup>
										{formik.errors.remarks && (
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
								<table className='table text-center '>
									<thead>
										<tr className='row'>
											<th className='col-md-3'>Items</th>
											<th className='col-md-2'>Quantity</th>
											<th className='col-md-2'>Remarks</th>
											<th className='col-md-1'>Remove</th>
										</tr>
									</thead>
									<tbody>
										{formik.values.childArray.length > 0 &&
											formik.values.childArray.map((items, index) => (
												<tr className='row' key={items.index}>
													<td className='col-md-3'>
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
																isTouched={
																	formik.touched.childArray
																		? formik.touched.childArray[
																				index
																		  ]?.item_id
																		: ''
																}
																invalidFeedback={
																	formik.errors[
																		`childArray[${index}].item_id`
																	]
																}
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
													<td className='col-md-2'>
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
																isTouched={
																	formik.touched.childArray
																		? formik.touched.childArray[
																				index
																		  ]?.quantity
																		: ''
																}
																invalidFeedback={
																	formik.errors[
																		`childArray[${index}]quantity`
																	]
																}
															/>
														</FormGroup>
													</td>
													{/* <td className='col-md-1'>
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
													</td> */}
													{/* <td className='col-md-2'>
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
															id={`childArray[${index}].sale_price`}
															label=''
															type='number'
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={items.sale_price}
																isValid={formik.isValid}
																isTouched={
																	formik.touched.sale_price
																}
																invalidFeedback={
																	formik.errors.sale_price
																}
																
															/>
														</FormGroup>
														{formik.errors[
															`childArray[${index}]sale_price`
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
																		`childArray[${index}]sale_price`
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
													</td> */}
													<td className='col-md-2'>
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
																//
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
														item_id: '',
														quantity: '',
														received_quantity: 0,
														remarks: '',
													},
												]);
											}}>
											Add
										</Button>
									</div>
								</div>
								<hr />
								{/* <div className='row g-2  d-flex justify-content-start mt-2'>
									<div className='col-md-2'>
										<FormGroup id='total' label='Total' className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.total}
												isValid={formik.isValid}
												isTouched={formik.touched.total}
												invalidFeedback={formik.errors.total}
												
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup id='tax' label='Tax(%)' className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.tax}
												isValid={formik.isValid}
												isTouched={formik.touched.tax}
												invalidFeedback={formik.errors.tax}
												
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
												
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup
											id='total_after_tax'
											label='Total After Tax'
											className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.total_after_tax}
												isValid={formik.isValid}
												isTouched={formik.touched.total_after_tax}
												invalidFeedback={formik.errors.total_after_tax}
												
											/>
										</FormGroup>
									</div>

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
												
											/>
										</FormGroup>
									</div>
								</div> */}
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
