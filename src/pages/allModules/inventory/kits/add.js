// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-undef */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
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
// eslint-disable-next-line import/no-unresolved

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
import Label from '../../../../components/bootstrap/forms/Label';
import Input from '../../../../components/bootstrap/forms/Input';
import Button from '../../../../components/bootstrap/Button';

const validate = (values) => {
	const errors = {};
	if (!values.in_flow) {
		errors.in_flow = 'Required';
	}
	if (!values.kit_id) {
		errors.kit_id = 'Required';
	}
	if (!values.store_id) {
		errors.store_id = 'Required';
	}
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
	const [kitOptions, setKitOptions] = useState('');
	const [kitOptionsLoading, setKitOptionsLoading] = useState(false);
	const [tableDataLoading, setTableDataLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	const [storeOptions, setStoreOptions] = useState('');
	const [storeOptionsLoading, setStoreOptionsLoading] = useState(false);

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
			in_flow: '',
			kit_id: '',
			out_flow: 0,
			store_id: '',
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
	const submitForm = (myFormik) => {
		Axios.post(`${baseURL}/addKitInventory`, myFormik.values, {
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
		if (formik.values.kit_id && formik.values.store_id) {
			Axios.get(
				`${baseURL}/viewKits?id=${
					formik.values.kit_id ? formik.values.kit_id : ''
				}&store_id=${formik.values.store_id}`,
				{},
			)
				.then((response) => {
					const rec = response.data.kitRecipe.kitchild.map(
						({ id, quantity, item, exisiting_item_inventory }) => ({
							id,
							value: id,
							oem: `${item.machine_part_oem_part.oem_part_number.number1}`,
							name: `${item.machine_part_oem_part.machine_part.name}`,
							reqQty: quantity,
							exisQty: exisiting_item_inventory.existing_quantity,
						}),
					);
					setTableData(rec);
					setTableDataLoading(false);
				})
				.catch((err) => {
					showNotification(_titleError, err.message, 'Danger');
				});
		}
	}, [formik.values.kit_id, formik.values.store_id]);
	useEffect(() => {
		setStoreOptionsLoading(true);

		Axios.get(`${baseURL}/getStoredropdown`)
			.then((response) => {
				const rec = response.data.store.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setStoreOptions(rec);
				setStoreOptionsLoading(false);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
		Axios.get(`${baseURL}/getkitsDropdown`)
			.then((response) => {
				const rec = response.data.kitsDropdown.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setKitOptions(rec);

				setKitOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='col-auto'>
			<div className='col-auto'>
				<Button
					color='success'
					isLight
					icon='Add'
					hoverShadow='default'
					onClick={() => {
						initialStatus();

						setState(true);
						setStaticBackdropStatus(true);
					}}>
					Make New Kit
				</Button>
			</div>
			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size='md'
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<CardLabel icon='Add'>
						<ModalTitle id='exampleModalLabel'>Make New Kit</ModalTitle>
					</CardLabel>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardBody>
								<div className='row g-2'>
									<div className='col-md-12'>
										<FormGroup label='Name' id='name'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={storeOptions}
												isLoading={storeOptionsLoading}
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
														setTableData(['']),
													);
												}}
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
										{formik.errors.store_id && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.store_id}
											</p>
										)}
									</div>
									<div className='col-md-12'>
										<FormGroup label='Kit Name' id='kit_id'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={kitOptions}
												isLoading={kitOptionsLoading}
												isClearable
												value={
													formik.values.kit_id
														? kitOptions.find(
																(c) =>
																	c.value ===
																	formik.values.kit_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'kit_id',
														val !== null && val.id,
														setTableData(['']),
													);
												}}
												isValid={formik.isValid}
												isTouched={formik.touched.kit_id}
												invalidFeedback={formik.errors.kit_id}
												validFeedback='Looks good!'
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
										{formik.errors.kit_id && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.kit_id}
											</p>
										)}
										<table className='table table-modern my-3'>
											<thead>
												<tr>
													<th>Oem</th>
													<th>Items</th>
													<th>Required Quantity</th>
													<th>Exisiting Quantity</th>
												</tr>
											</thead>
											{tableDataLoading ? (
												<tbody>
													<tr>
														<td colSpan='12'>
															<div className='d-flex justify-content-center'>
																<Spinner
																	color='primary'
																	size='3rem'
																/>
															</div>
														</td>
													</tr>
												</tbody>
											) : (
												<tbody>
													{tableData.map((item) => (
														<tr key={item.id}>
															<td>{item.oem}</td>
															<td>{item.name}</td>
															<td>{item.reqQty}</td>
															<td>{item.exisQty}</td>
														</tr>
													))}
												</tbody>
											)}
										</table>
										<div className='row '>
											<FormGroup label='' className='col-md-4 mt-2 ml-5 '>
												<Label> Kit Quantity</Label>
											</FormGroup>

											<FormGroup id='in_flow' label='' className='col-md-8'>
												<Input
													type='number'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.in_flow}
													isValid={formik.isValid}
													isTouched={formik.touched.in_flow}
													invalidFeedback={formik.errors.in_flow}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
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
										icon={isLoading ? null : 'Submit'}
										isLight
										color='success'
										isDisable={isLoading}
										onClick={formik.handleSubmit}>
										{isLoading && <Spinner isSmall inButton />}
										{isLoading ? 'Submiting' : 'Submit'}
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
