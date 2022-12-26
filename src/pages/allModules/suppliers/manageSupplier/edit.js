// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import moment from 'moment';
import PropTypes from 'prop-types';
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
	if (!values.company) {
		errors.company = 'Required';
	}
	if (!values.address) {
		errors.address = 'Required';
	}
	if (!values.phone_no) {
		errors.phone_no = 'Required';
	}
	if (!values.gst) {
		errors.gst = 'Required';
	}
	if (!values.ntn) {
		errors.ntn = 'Required';
	}
	if (!values.cnic) {
		errors.cnic = 'Required';
	}
	if (!values.email) {
		errors.email = 'Required';
	}

	return errors;
};

// eslint-disable-next-line react/prop-types
const Edit = ({ editingItem, handleStateEdit }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	// useEffect(() => {

	// }, [])

	const formik = useFormik({
		initialValues: editingItem,
		name: '',
		type: '',
		address: '',
		company: '',
		phone_no: '',
		email: '',
		cnic: '',
		gst: '',
		ntn: '',
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});

	const submitForm = (data) => {
		Axios.post(`${baseURL}/updateSupplier`, data)
			.then((res) => {
				if (res.data.status === 'ok') {
					formik.resetForm();
					showNotification(_titleSuccess, res.data.message, 'success');
					handleStateEdit(false);
					setIsLoading(false);
					setLastSave(moment());
				} else {
					setIsLoading(false);
					showNotification(_titleError, res.data.message, 'Danger');
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
	return (
		<div className='col-12'>
			<Card stretch tag='form' onSubmit={formik.handleSubmit}>
				<CardBody>
					<div className='row g-2'>
						<div className='col-md-12'>
							{/* <FormGroup label='Type ID' id='type_id'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={machineOptions}
												isLoading={machineOptionsLoading}
												isClearable
												value={
													formik.values.type_id
														? machineOptions.find(
																(c) =>
																	c.value ===
																	formik.values.type_id,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'type_id',
														val !== null && val.id,
													);
												}}
												isValid={formik.isValid}
												isTouched={formik.touched.type_id}
												invalidFeedback={formik.errors.type_id}
												validFeedback='Looks good!'
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
										{formik.errors.type_id && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.type_id}
											</p>
										)} */}
							<FormGroup id='type' label='Type' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.type}
									isValid={formik.isValid}
									isTouched={formik.touched.type}
									invalidFeedback={formik.errors.type}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<FormGroup id='name' label='Name' className='col-md-12'>
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

							<FormGroup id='company' label='Company' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.company}
									isValid={formik.isValid}
									isTouched={formik.touched.company}
									invalidFeedback={formik.errors.company}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<FormGroup id='email' label='email' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email}
									isValid={formik.isValid}
									isTouched={formik.touched.email}
									invalidFeedback={formik.errors.email}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<FormGroup id='gst' label='gst' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.gst}
									isValid={formik.isValid}
									isTouched={formik.touched.gst}
									invalidFeedback={formik.errors.gst}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<FormGroup id='ntn' label='ntn' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.ntn}
									isValid={formik.isValid}
									isTouched={formik.touched.ntn}
									invalidFeedback={formik.errors.ntn}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<FormGroup id='phone_no' label='phone_no' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.phone_no}
									isValid={formik.isValid}
									isTouched={formik.touched.phone_no}
									invalidFeedback={formik.errors.phone_no}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<FormGroup id='address' label='Address' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address}
									isValid={formik.isValid}
									isTouched={formik.touched.address}
									invalidFeedback={formik.errors.address}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<FormGroup id='cnic' label='Cnic' className='col-md-12'>
								<Input
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.cnic}
									isValid={formik.isValid}
									isTouched={formik.touched.cnic}
									invalidFeedback={formik.errors.cnic}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
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
							icon={isLoading ? null : 'Update'}
							isLight
							color={lastSave ? 'info' : 'success'}
							isDisable={isLoading}
							onClick={formik.handleSubmit}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading
								? (lastSave && 'Updating') || 'Updating'
								: (lastSave && 'Update') || 'Update'}
						</Button>
					</CardFooterRight>
				</CardFooter>
			</Card>
		</div>
	);
};
Edit.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	editingItem: PropTypes.object.isRequired,
	// handleStateEdit: PropTypes.function.isRequired,
};

export default Edit;
