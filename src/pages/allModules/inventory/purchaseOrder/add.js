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
	// if (values.rows.length === 0) {
	// 	errors.rows = <p>Insert at leat a single item!</p>;
	// }
	if (!values.po_no) {
		errors.po_no = 'Required';
	}
	if (!values.supplier_id) {
		errors.supplier_id = 'Required';
	}
	if (!values.department_id) {
		errors.department_id = 'Required';
	}
	// if (values.rows.length === 0) {
	// 	errors.rows = (
	// 		<p className='col-md-7' style={{ marginTop: 4, textAlign: 'left', color: 'red' }}>
	// 			Add at least one Item
	// 		</p>
	// 	);
	// }
	values.rows.forEach((data, index) => {
		if (!data.item_id) {
			errors = {
				...errors,
				[`rows[${index}]item_id`]: 'Required!',
			};
		}

		if (!data.quantity > 0) {
			errors = {
				...errors,
				[`rows[${index}]quantity`]: 'Required',
			};
		}
	});
	// eslint-disable-next-line no-console
	// console.log('Errr', errors);
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
			name: '',
			// quantity: 0,
			// childArray: [{ quantity: '' }],
			rows: [{ item_id: '', quantity: '' }],
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
		formik.setFieldValue('rows', [
			...formik.values.rows.slice(0, i),
			...formik.values.rows.slice(i + 1),
		]);
	};
	const submitForm = (myFormik) => {
		Axios.post(`${baseURL}/addKit`, myFormik.values, {
			headers: { Authorization: `Bearer ${0}` },
		})
			.then((res) => {
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
									<div className='col-md-3'>
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
												isLoading={supplierOptionsLoading}
												options={supplierOptions}
												value={
													formik.values.supplier_id
														? supplierOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.supplier_id,
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
									<div className='col-md-3'>
										<FormGroup label='Delivery Place' id='delivery_branch_id'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={branchOptions}
												isLoading={branchOptionsLoading}
												isClearable
												value={
													formik.values.delivery_branch_id
														? branchOptions.find(
																(c) =>
																	c.value ===
																	formik.values
																		.delivery_branch_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'delivery_branch_id',
														val !== null && val.id,
													);
												}}
												isValid={formik.isValid}
												isTouched={formik.touched.delivery_branch_id}
												invalidFeedback={formik.errors.delivery_branch_id}
												validFeedback='Looks good!'
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div>
								</div>
								<div className='row g-2 mt-2  d-flex justify-content-start'>
									<div className='col-md-3'>
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
										{formik.errors.request_date && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.request_date}
											</p>
										)}
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
											<th className='col-md-3'>Items</th>
											{/* <th className='col-md-2'>Unit</th> */}
											{/* <th className='col-md-1'>Existing Qty</th> */}
											<th className='col-md-2'>Quantity</th>
											{/* <th className='col-md-3'>Remarks</th> */}
											<th className='col-md-2'>Remove</th>
										</tr>
										{/* {formik.errors.rows && (
											// <div className='invalid-feedback'>
											<tr>{formik.errors.rows}</tr>
										)} */}
									</thead>
									<tbody>
										{formik.values.rows.length > 0 &&
											formik.values.rows.map((items, index) => (
												<tr className='row' key={items.index}>
													<td className='col-md-3'>
														<FormGroup
															label=''
															id={`rows[${index}].item_id`}>
															<ReactSelect
																className='col-md-12'
																classNamePrefix='select'
																options={kitOptions}
																isLoading={kitOptionsLoading}
																isClearable
																value={
																	formik.values.rows[index]
																		.item_id
																		? kitOptions.find(
																				(c) =>
																					c.value ===
																					formik.values
																						.rows[index]
																						.item_id,
																		  )
																		: null
																}
																onChange={(val) => {
																	formik.setFieldValue(
																		`rows[${index}].item_id`,
																		val !== null && val.id,
																	);
																}}
																isValid={formik.isValid}
																isTouched={formik.touched.item_id}
																invalidFeedback={
																	formik.errors[
																		`rows[${index}].item_id`
																	]
																}
																validFeedback='Looks good!'
																filterOption={createFilter({
																	matchFrom: 'start',
																})}
															/>
														</FormGroup>
														{formik.errors[`rows[${index}]item_id`] && (
															// <div className='invalid-feedback'>
															<p
																style={{
																	color: 'red',
																	textAlign: 'left',
																	marginTop: 3,
																}}>
																{
																	formik.errors[
																		`rows[${index}]item_id`
																	]
																}
															</p>
														)}
													</td>
													<td className='col-md-2'>
														<FormGroup
															id={`rows[${index}].quantity`}
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
															`rows[${index}]quantity`
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
																		`rows[${index}]quantity`
																	]
																}
															</p>
														)}
													</td>
													{/* <td className='col-md-3'>
														<FormGroup
															id='remarks'
															label=''
															className='col-md-12'>
															<Input
																onChange={formik.handleChange}
																onBlur={formik.handleBlur}
																value={formik.values.remarks}
																isValid={formik.isValid}
																isTouched={formik.touched.remarks}
																invalidFeedback={
																	formik.errors.remarks
																}
																validFeedback='Looks good!'
															/>
														</FormGroup>
													</td> */}
													<td className='col-md-2 mt-1'>
														<Button
															isDisable={
																formik.values.rows.length === 1
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
												formik.setFieldValue('rows', [
													...formik.values.rows,
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
