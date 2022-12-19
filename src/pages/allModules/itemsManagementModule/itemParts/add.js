// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';

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
	const errors = {};

	if (!values.secondary) {
		errors.secondary = 'Required';
	}
	if (!values.machine) {
		errors.machine = 'Required';
	}
	if (!values.make) {
		errors.make = 'Required';
	}
	if (!values.machine_model_id) {
		errors.model = 'Required';
	}
	if (!values.brand) {
		errors.brand = 'Required';
	}
	if (!values.machine_part_id) {
		errors.item = 'Required';
	}
	return errors;
};

const Add = ({ refreshTableData }) => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);

	const [tableData, setTableData] = useState([]);
	const [tableData2, setTableData2] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);


	const [state, setState] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	const [machineOptions, setMachineOptions] = useState();
	const [machineOptionsLoading, setMachineOptionsLoading] = useState(false);
	const [makeOptions, setMakeOptions] = useState();
	const [makeOptionsLoading, setMakeOptionsLoading] = useState(false);
	const [modelOptions, setModelOptions] = useState();
	
	const [modelOptionsLoading, setModelOptionsLoading] = useState(false);
	const [itemOptions, setItemOptions] = useState();
	const [itemOptionsLoading, setItemOptionsLoading] = useState(false);
	const [brandOptions, setBrandOptions] = useState();
	const [brandOptionsLoading, setBrandOptionsLoading] = useState(false);
	// const [selectedMachine, setSelectedMachine] = useState({
	// 	id: `${0}`,
	// 	label: '',
	// });

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
			secondary: '',
			machine: '',
			make: '',
			machine_model_id: '',
			brand: '',
			machine_part_id: '',

			list: []
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
	useEffect(() => {

		Axios.get(`${baseURL}/getCompaniesDropDown`)
			.then((response) => {
				const rec = response.data.companies.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
					oem_primary: '',
					oem_secondary: '',

				}));
				formik.setFieldValue(
					'list',
					rec,
				);

			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');


				}
			});
		Axios.get(`${baseURL}/getMachinesDropDown`)
			.then((response) => {
				const rec = response.data.machines.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setMachineOptions(rec);
				setMachineOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');


				}
			});
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
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');


				}
			});



		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const submitForm = (myFormik) => {
		Axios.post(`${baseURL}/addMake`, myFormik.values, {
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
						<ModalTitle id='exampleModalLabel'>Add Make</ModalTitle>
					</CardLabel>


				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardBody>
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-4'>
										<FormGroup label='Machine' id='machine'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={machineOptions}
												isLoading={machineOptionsLoading}

												isClearable
												value={
													formik.values.machine
														? machineOptions?.find(
															(c) =>
																c.value ===
																formik.values.machine,
														)
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'machine',
														val !== null && val.id,
													);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.machine}
												invalidFeedback={formik.errors.machine}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.machine && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.machine}
											</p>
										)}

									</div>

									<div className='col-md-4'>
										<FormGroup label='Make' id='make'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={makeOptions}
												isLoading={makeOptionsLoading}
												isClearable
												value={
													formik.values.machine
														? machineOptions?.find(
															(c) =>
																c.value ===
																formik.values.make,
														)
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'make',
														val !== null && val.id,
													);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.make}
												invalidFeedback={formik.errors.make}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.make && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.make}
											</p>
										)}

									</div>
									<div className='col-md-4'>
										<FormGroup label='Model' id='machine_model_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={modelOptions}
												isLoading={modelOptionsLoading}
												isClearable
												value={
													formik.values.machine_model_id
														? modelOptions?.find(
															(c) =>
																c.value ===
																formik.values.machine_model_id,
														)
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'machine_model_id',
														val !== null && val.id,
													);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.model}
												invalidFeedback={formik.errors.model}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.machine_model_id && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.machine_model_id}
											</p>
										)}
									</div></div><br />
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-3'>
										<FormGroup label='Brand' id='brand'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={brandOptions}
												isLoading={brandOptionsLoading}
												isClearable
												value={
													formik.values.brand
														? brandOptions?.find(
															(c) =>
																c.value ===
																formik.values.brand,
														)
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'brand',
														val !== null && val.id,
													);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.brand}
												invalidFeedback={formik.errors.brand}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.brand && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.brand}
											</p>
										)}
									</div>
									<div className='col-md-3'>
										<FormGroup label='Items' id='machine_part_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={itemOptions}
												isLoading={itemOptionsLoading}
												isClearable
												value={
													formik.values.machine_part_id
														? itemOptions?.find(
															(c) =>
																c.value === formik.values.machine_part_id,
														)
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'machine_part_id',
														val !== null && val.id,
													);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.item}
												invalidFeedback={formik.errors.item}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.machine_part_id && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.machine_part_id}
											</p>
										)}
									</div>
									<div className='col-md-3'>
										<FormGroup id='Primary' label='Primary' className='col-md-12'>
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
									</div>
									<div className='col-md-3'>
										<FormGroup id='secondary' label='Secondary' className='col-md-12'>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.secondary}
												isValid={formik.isValid}
												isTouched={formik.touched.secondary}
												invalidFeedback={formik.errors.secondary}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
								</div><br />
								<div className='table-responsive'>
									<table className='table table-modern'>
										<thead>
											<tr>

												<th>Company </th>
												<th>Primary</th>
												<th>Secondary</th>
											</tr>
										</thead>

										<tbody>
											{formik.values.list?.map(
												(item, index) => (
													<tr key={item.id}>


														<td>{item.label}</td>
														<td><FormGroup id='oem_primary' className='col-md-12'>
															<Input
																type="text"
																onChange={(e) => {
																	formik.setFieldValue(`list[${index}].oem_primary`, val);
																}}
																invalidFeedback={formik.errors[`list[${index}]oem_primary`]}

																value={item.oem_primary}

															/>
														</FormGroup></td>
														<td><FormGroup id='oem_secondary' className='col-md-12'>
															<Input
																type="text"
																onChange={(e) => {
																	formik.setFieldValue(`list[${index}].oem_secondary`, val);
																}}
																invalidFeedback={formik.errors[`list[${index}]oem_secondary`]}

																value={item.oem_secondary}

															/>
														</FormGroup></td>

													</tr>
												),
											)}

										</tbody>


									</table>
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