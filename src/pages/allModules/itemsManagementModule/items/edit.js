// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import moment from 'moment';
import ReactSelect, { createFilter } from 'react-select';
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
	return errors;
};

// eslint-disable-next-line react/prop-types
const Edit = ({ editingItem, handleStateEdit }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [categoryOptionsLoading, setCategoryOptionsLoading] = useState(false);
	// useEffect(() => {

	// }, [])

	const formik = useFormik({
		initialValues: editingItem,
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});

	const submitForm = (data) => {
		Axios.post(`${baseURL}/updateMachinePart`, data)
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
		setCategoryOptionsLoading(true);

		Axios.get(`${baseURL}/getCategoriesDropDown`)
			.then((response) => {
				const rec = response.data.categories.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				console.log('getCAtegdrop', rec);
				setCategoryOptions(rec);
				setCategoryOptionsLoading(false);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
	}, []);
	return (
		<div className='col-12'>
			<Card stretch tag='form' onSubmit={formik.handleSubmit}>
				<CardBody>
					<div className='row g-2'>
						<div className='col-md-12'>
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
						</div>
						<div className='col-md-12'>
							<FormGroup label='Category' id='category_id'>
								<ReactSelect
									className='col-md-12'
									classNamePrefix='select'
									options={categoryOptions}
									isLoading={categoryOptionsLoading}
									isClearable
									value={
										formik.values.category_id
											? categoryOptions.find(
													(c) => c.value === formik.values.category_id,
											  )
											: null
									}
									onChange={(val) => {
										formik.setFieldValue(
											'category_id',
											val !== null && val.id,
											// setTableData(['']),
										);
									}}
									filterOption={createFilter({ matchFrom: 'start' })}
								/>
							</FormGroup>
							{formik.errors.id && (
								// <div className='invalid-feedback'>
								<p
									style={{
										color: 'red',
									}}>
									{formik.errors.id}
								</p>
							)}
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
