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
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
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
	const [kitOptions, setKitOptions] = useState();
	const [kitOptionsLoading, setKitOptionsLoading] = useState(false);
	const [makeOptions, setMakeOptions] = useState();
	const [makeOptionsLoading, setMakeOptionsLoading] = useState(false);
	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

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
			make_id: '',
			list: [{ kit_id: '', requiredQuantity: '' }],
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
		formik.setFieldValue('list', [
			...formik.values.list.slice(0, i),
			...formik.values.list.slice(i + 1),
		]);
	};
	const submitForm = (myFormik) => {
		Axios.post(`${baseURL}/addMachineModel`, myFormik.values, {
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
		Axios.get(`${baseURL}/getMachinesDropDown`)
			.then((response) => {
				const rec = response.data.machines.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setKitOptions(rec);
				setKitOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {});

		Axios.get(`${baseURL}/getMakesDropDown`)
			.then((response) => {
				const rec = response.data.makes.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setMakeOptions(rec);
				setMakeOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {});
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
					Add New
				</Button>
			</div>
			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size='lg'
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<CardLabel icon='Add'>
						<ModalTitle id='exampleModalLabel'>Add New Kit</ModalTitle>
					</CardLabel>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardBody>
								<div className='row g-2'>
									<div className='col-md-12'>
										<FormGroup id='name' label='Kit Name' className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.name}
												isValid={formik.isValid}
												isTouched={formik.touched.name}
												invalidFeedback={formik.errors.name}
												validFeedback='Looks good!'
											/>
										</FormGroup>

										<table
											className='table text-center table-modern'
											style={{ overflow: 'scrollY' }}>
											<thead>
												<tr className='row mt-2' style={{ marginLeft: 2 }}>
													<th className='col-5 col-sm-5 col-md-6'>
														Items Name
													</th>
													<th className='col-5 col-sm-5 col-md-5'>
														Required Quantity
													</th>
												</tr>
											</thead>
											<tbody>
												{formik.values.list.length > 0 &&
													formik.values.list.map((items, index) => (
														<tr
															className='d-flex align-items-center'
															key={formik.values.list[index].kit_id}>
															<td className='col-5 col-sm-5 col-md-7'>
																<FormGroup
																	label=''
																	id={`list[${index}].kit_id`}>
																	<ReactSelect
																		className='col-md-12'
																		classNamePrefix='select'
																		options={kitOptions}
																		isLoading={
																			kitOptionsLoading
																		}
																		isClearable
																		value={
																			formik.values.list[
																				index
																			].kit_id
																				? kitOptions.find(
																						(c) =>
																							c.value ===
																							formik
																								.values
																								.list[
																								index
																							]
																								.kit_id,
																				  )
																				: null
																		}
																		onChange={(val) => {
																			formik.setFieldValue(
																				`list[${index}].kit_id`,
																				val !== null &&
																					val.id,
																			);
																		}}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.kit_id
																		}
																		invalidFeedback={
																			formik.errors[
																				`list[${index}].kit_id`
																			]
																		}
																		validFeedback='Looks good!'
																		filterOption={createFilter({
																			matchFrom: 'start',
																		})}
																	/>
																</FormGroup>
															</td>
															<td
																className='col-5 col-sm-5 col-md-4'
																style={{ marginLeft: 10 }}>
																<FormGroup
																	id={`list[${index}].requiredQuantity`}
																	label=''
																	className='col-md-12'>
																	<Input
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			items.requiredQuantity
																		}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched
																				.requiredQuantity
																		}
																		invalidFeedback={
																			formik.errors
																				.requiredQuantity
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</td>
															<td className='col-md-1 mt-1'>
																<Button
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
														formik.setFieldValue('list', [
															...formik.values.list,
															{
																name: '',
																requiredQuantity: '',
															},
														]);
													}}>
													Add
												</Button>
											</div>
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
