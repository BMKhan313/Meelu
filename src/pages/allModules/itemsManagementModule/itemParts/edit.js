// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import moment from 'moment';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';

// eslint-disable-next-line import/no-unresolved
import Spinner from '../../../../components/bootstrap/Spinner';
import { _titleError, _titleSuccess } from '../../../../notifyMessages/erroSuccess';

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
import showNotification from '../../../../components/extras/showNotification';

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
	}
	if (!values.number2) {
		errors.number2 = 'Required';
	}
	if (!values.number1) {
		errors.number1 = 'Required';
	}
	// if (!values.machine_id) {
	// 	errors.machine_id = 'Required';
	// }
	// if (!values.make_id) {
	// 	errors.make_id = 'Required';
	// }
	if (!values.machine_model_id) {
		errors.machine_model_id = 'Required';
	}

	if (!values.machine_part_id) {
		errors.machine_part_id = 'Required';
	}
	return errors;
};

// eslint-disable-next-line react/prop-types
const Edit = ({ editingItem, handleStateEdit }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);
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
	// useEffect(() => {

	// }, [])

	const formik = useFormik({
		initialValues: editingItem,
		number2: '',
		number1: '',
		machine_id: '',
		make_id: '',
		machine_model_id: '',
		brand: '',
		machine_part_id: '',
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});

	const submitForm = (data) => {
		Axios.post(`${baseURL}/updateMake`, data)
			.then((res) => {
				if (res.data.status === 'ok') {
					formik.resetForm();
					showNotification(_titleSuccess, res.data.message, 'success');
					handleStateEdit(false);
					setIsLoading(false);
					setLastSave(moment());
				} else {
					setIsLoading(false);
					showNotification(_titleError, res.message, 'Danger');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');
				}
				setIsLoading(false);
			});
	};

	const handleSave = () => {
		submitForm(formik.values);
		setLastSave(moment());
	};
	useEffect(() => {
		setModelOptionsLoading(true);

		Axios.get(
			`${baseURL}/getMachineModelsDropDown?machine_id=${
				formik.values.machine_id ? formik.values.machine_id : ''
			}&make_id=${formik.values.make_id ? formik.values.make_id : ''}`,
		)
			.then((response) => {
				const rec = response.data.machineModels.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setModelOptions(rec);
				setModelOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
	}, [formik.values.machine_id, formik.values.make_id]);
	useEffect(() => {
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
		Axios.get(`${baseURL}/getMachinePartsDropDown`)
			.then((response) => {
				const rec = response.data.machine_Parts.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setItemOptions(rec);
				setItemOptionsLoading(false);
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

	return (
		<Card stretch tag='form' onSubmit={formik.handleSubmit}>
			<CardBody>
				<div className='row g-4 '>
					<div className='col-md-4'>
						<FormGroup label='Machine' id='machine_id'>
							<Select
								className='col-md-12'
								classNamePrefix='select'
								options={machineOptions}
								isLoading={machineOptionsLoading}
								isClearable
								value={
									formik.values.machine_id
										? machineOptions?.find(
												(c) => c.value === formik.values.machine_id,
										  )
										: null
								}
								onChange={(val) => {
									formik.setFieldValue('machine_id', val !== null && val.id);
								}}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={formik.touched.machine_id}
								invalidFeedback={formik.errors.machine_id}
								validFeedback='Looks good!'
							/>
						</FormGroup>
						{formik.errors.machine_id && (
							// <div className='invalid-feedback'>
							<p
								style={{
									color: 'red',
								}}>
								{formik.errors.machine_id}
							</p>
						)}
					</div>

					<div className='col-md-4'>
						<FormGroup label='Make' id='make_id'>
							<Select
								className='col-md-12'
								classNamePrefix='select'
								options={makeOptions}
								isLoading={makeOptionsLoading}
								isClearable
								value={
									formik.values.make_id
										? makeOptions?.find(
												(c) => c.value === formik.values.make_id,
										  )
										: null
								}
								onChange={(val) => {
									formik.setFieldValue('make_id', val !== null && val.id);
								}}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={formik.touched.make_id}
								invalidFeedback={formik.errors.make_id}
								validFeedback='Looks good!'
							/>
						</FormGroup>
						{formik.errors.make_id && (
							// <div className='invalid-feedback'>
							<p
								style={{
									color: 'red',
								}}>
								{formik.errors.make_id}
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
												(c) => c.value === formik.values.machine_model_id,
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
								isTouched={formik.touched.machine_model_id}
								invalidFeedback={formik.errors.machine_model_id}
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
					</div>
				</div>
				<br />
				<div className='row g-4'>
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
										? brandOptions?.find((c) => c.value === formik.values.brand)
										: null
								}
								onChange={(val) => {
									formik.setFieldValue('brand', val !== null && val.id);
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
												(c) => c.value === formik.values.machine_part_id,
										  )
										: null
								}
								onChange={(val) => {
									formik.setFieldValue('machine_part_id', val !== null && val.id);
								}}
								onBlur={formik.handleBlur}
								isValid={formik.isValid}
								isTouched={formik.touched.machine_part_id}
								invalidFeedback={formik.errors.machine_part_id}
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
						<FormGroup id='number1' label='Primary' className='col-md-12'>
							<Input
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.name}
								isValid={formik.isValid}
								isTouched={formik.touched.number1}
								invalidFeedback={formik.errors.number1}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-3'>
						<FormGroup id='number2' label='Secondary' className='col-md-12'>
							<Input
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.number2}
								isValid={formik.isValid}
								isTouched={formik.touched.number2}
								invalidFeedback={formik.errors.number2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
				</div>
				<br />
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
							{formik.values.rows?.map((item, index) => (
								<tr key={item.id}>
									<td>{item.label}</td>
									<td>
										<FormGroup id='number1' className='col-md-12'>
											<Input
												type='text'
												onChange={(val) => {
													formik.setFieldValue(
														`rows[${index}].number1`,
														val.target.value,
													);
												}}
												invalidFeedback={
													formik.errors[`rows[${index}]number1`]
												}
												value={item.number1}
											/>
										</FormGroup>
									</td>
									<td>
										<FormGroup id='number2' className='col-md-12'>
											<Input
												type='text'
												onChange={(val) => {
													formik.setFieldValue(
														`rows[${index}].number2`,
														val.target.value,
													);
												}}
												invalidFeedback={
													formik.errors[`rows[${index}]number2`]
												}
												value={item.number2}
											/>
										</FormGroup>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterLeft>
					<Button type='reset' color='info' isOutline onClick={formik.resetForm}>
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
	);
};
Edit.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	editingItem: PropTypes.object.isRequired,
	// handleStateEdit: PropTypes.function.isRequired,
};

export default Edit;
