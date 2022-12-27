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
	const [machineOptions, setMachineOptions] = useState('');
	const [machineOptionsLoading, setMachineOptionsLoading] = useState(false);
	const [tableDataLoading, setTableDataLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
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
			in_flow: '',
			kit_id: '',
			out_flow: 0,
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
		if (formik.values.kit_id) {
			Axios.get(
				`${baseURL}/viewKits?id=${formik.values.kit_id ? formik.values.kit_id : ''}`,
				{},
			)
				.then((response) => {
					const rec = response.data.kitRecipe.kitchild.map(
						({ id, quantity, item_oem_part_modeles }) => ({
							id,
							value: id,
							// name: `${item_oem_part_modeles.machine_part_oem_part.oem_part_number.number1}-${item_oem_part_modeles.machine_part_oem_part.machine_part.name}`,
							reqQty: quantity,
							exisQty: 0,
						}),
					);
					setTableData(rec);
					setTableDataLoading(false);
				})
				.catch((err) => {
					showNotification(_titleError, err.message, 'Danger');
				});
		}
	}, [formik.values.kit_id]);
	useEffect(() => {
		Axios.get(`${baseURL}/getkitsDropdown`)
			.then((response) => {
				const rec = response.data.kitsDropdown.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setMachineOptions(rec);

				setMachineOptionsLoading(false);
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
										<FormGroup label='Kit Name' id='kit_id'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={machineOptions}
												isLoading={machineOptionsLoading}
												isClearable
												value={
													formik.values.kit_id
														? machineOptions.find(
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
													);
													setTableData('');
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
															{/* <td>{item.name}</td> */}
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
