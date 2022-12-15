// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState,} from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import moment from 'moment';
// // eslint-disable-next-line import/no-unresolved
// import { apiClient, useNavigate, demoPages, Cookies } from 'src/baseURL/authMultiExport';

// eslint-disable-next-line import/no-unresolved
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import Spinner from '../../../../components/bootstrap/Spinner';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';

import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';
// import { _titleSuccess, _titleError } from '../../../../notifyMessages/erroSuccess';

// import showNotification from '../../../../components/extras/showNotification';

const validate = (values) => {
	let errors = {};
	if (!values.po_no) {
		errors.po_no = 'Required';
	}
	if (!values.machine1) {
		errors.machine1 = 'Required';
	}
    if (!values.machine2) {
		errors.machine2 = 'Required';
	}
	if (!values.model) {
		errors.model = 'Required';
	}
    if (!values.model3) {
		errors.model3 = 'Required';
	}
   
	if (values.childArray.length === 0) {
		errors.childArray = 'Add an Item';
	}
	values.childArray.forEach((data, index) => {
	
		if (!data.item) {
			errors = {
				...errors,
				[`childArray[${index}]item`]: 'Required!',
			};
		}
        if (!data.item2) {
			errors = {
				...errors,
				[`childArray[${index}]item2`]: 'Required!',
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

// const Add = ({ refreshTableData }) => {
    const Add = () => {
	// const navigate = useNavigate();

	
	const [state, setState] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [animationStatus, setAnimationStatus] = useState(true);
	const [machine2Options, setMachine2Options] = useState([]);
	const [machine2OptionsLoading, setMachine2OptionsLoading] = useState(false);
    const [machineOptions, setMachineOptions] = useState([]);
	const [machineOptionsLoading, setMachineOptionsLoading] = useState(false);
	const [modelOptions, setModelOptions] = useState([]);
	const [modelOptionsLoading, setModelOptionsLoading] = useState(false);
    const [modelOptions3, setModelOptions3] = useState([]);
	const [modelOptionsLoading3, setModelOptionsLoading3] = useState(false);
    


	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	const [itemValue, setItemValue] = useState([null]);

	const submitForm = (data) => {
		console.log('submit');
	};
	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			childArray: [],
		
          machine1:'',
          po_no:'',
			machine2: '',
			
		model: '',
        model3: '',
		
		
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		// eslint-disable-next-line no-console
		console.log('FormValues', formik.values);
		setIsLoading(true);
		// submitForm(formik.values);
		setLastSave(moment());
	};

	const removeRow = (i) => {
		formik.setFieldValue('childArray', [
			...formik.values.childArray.slice(0, i),
			...formik.values.childArray.slice(i + 1),
		]);
		// eslint-disable-next-line no-console
	};

	// const getItemsbySubCategory = (index, subCategory) => {
	// 	if (subCategory !== null) {
	// 		formik.setFieldValue(`childArray[${index}].itemsOptionsLoading`, true);

	// 		apiClient
	// 			.get(`api/getItemsDropDown?subcategory_id=${subCategory.id}`)
	// 			.then((response) => {
	// 				const rec = response.data.items.map(({ id, name }) => ({
	// 					id,
	// 					value: id,
	// 					label: name,
	// 				}));
	// 				formik.setFieldValue(`childArray[${index}].itemsOptions`, rec);

	// 				formik.setFieldValue(`childArray[${index}].itemsOptionsLoading`, false);
	// 			})
	// 			// eslint-disable-next-line no-console
	// 			.catch((err) => {
	// 				showNotification(_titleError, err.message, 'Danger');
	// 				if (err.response.status === 401) {
	// 					showNotification(_titleError, err.response.data.message, 'Danger');

	// 					Cookies.remove('userToken');
	// 					navigate(`/${demoPages.login.path}`, { replace: true });
	// 				}
	// 			});
	// 	} else {
	// 		formik.setFieldValue(`childArray[${index}].itemsOptions`, []);
	// 		formik.setFieldValue(`childArray[${index}].item`, null);
	// 	}
	// };

	// const getSubCategoriesbyCategory = (index, categoryId) => {
	// 	if (categoryId !== null) {
	// 		formik.setFieldValue(`childArray[${index}].subCategoriesOptionsLoading`, true);

	// 		apiClient
	// 			.get(`api/getSubcategoriesDropDown?category_id=${categoryId}`)
	// 			.then((response) => {
	// 				const rec = response.data.subCategories.map(({ id, name }) => ({
	// 					id,
	// 					value: id,
	// 					label: name,
	// 				}));
	// 				formik.setFieldValue(`childArray[${index}].subCategoriesOptions`, rec);

	// 				formik.setFieldValue(`childArray[${index}].subCategoriesOptionsLoading`, false);
	// 			})
	// 			// eslint-disable-next-line no-console
	// 			.catch((err) => {
	// 				showNotification(_titleError, err.message, 'Danger');
	// 				if (err.response.status === 401) {
	// 					showNotification(_titleError, err.response.data.message, 'Danger');

	// 					Cookies.remove('userToken');
	// 					navigate(`/${demoPages.login.path}`, { replace: true });
	// 				}
	// 			});
	// 	} else {
	// 		formik.setFieldValue(`childArray[${index}].subCategoriesOptions`, []);
	// 		formik.setFieldValue(`childArray[${index}].subcategory`, null);
	// 	}
	// };

	// const getUnitsDropDown = (item, index) => {
	// 	if (item !== null) {
	// 		formik.setFieldValue(`childArray[${index}].item_id`, item.id);
	// 		// eslint-disable-next-line no-console
	// 		apiClient
	// 			.get(`api/getItemUnit?item_id=${item.id}`)
	// 			.then((response) => {
	// 				console.log('!!!!', response.data);
	// 				formik.setFieldValue(
	// 					`childArray[${index}].unit`,
	// 					`${response.data.unit.unit === null ? '' : response.data.unit.unit.name1}`,
	// 				);
	// 				formik.setFieldValue(
	// 					`childArray[${index}].existing_quantity`,
	// 					response.data.stock === null ? 0 : response.data.stock,
	// 				);
	// 			})
	// 			// eslint-disable-next-line no-console
	// 			.catch((err) => {
	// 				// showNotification(_titleError, err.message, 'Danger');
	// 				if (err.response.status === 401) {
	// 					showNotification(_titleError, err.response.data.message, 'Danger');

	// 					Cookies.remove('userToken');
	// 					navigate(`/${demoPages.login.path}`, { replace: true });
	// 				}
	// 			});
	// 	}
	// };
	// useEffect(() => {
	// 	if (state === true) {
	// 		apiClient
	// 			.get(`api/getPurchaseOrderNo`)
	// 			.then((response) => {
	// 				formik.setFieldValue('po_no', response.data.po_no);
	// 			})
	// 			// eslint-disable-next-line no-console
	// 			.catch((err) => {
	// 				showNotification(_titleError, err.message, 'Danger');
	// 				if (err.response.status === 401) {
	// 					showNotification(_titleError, err.response.data.message, 'Danger');

	// 					Cookies.remove('userToken');
	// 					navigate(`/${demoPages.login.path}`, { replace: true });
	// 				}
	// 			});
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [state]);
	

	

	const clearUnit = (idx) => {
		formik.setFieldValue(`childArray[${idx}].unit`, '');
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
				size='xl'
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<ModalTitle id='exampleModalLabel'>
						<CardHeader>
							<CardLabel icon='CheckBox' iconColor='info'>
								<CardTitle> add Item </CardTitle>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardBody>
								<div className='row g-2  d-flex justify-content-start'>
                                <div className='col-md-3'>
										<FormGroup
											id='machine1'
											label='machine1'
											className='col-md-12'>
											<ReactSelect
												className='col-md-12'
												isClearable
												isLoading={machineOptionsLoading}
												options={machineOptions}
												value={
													formik.values.machine1
														? machineOptions?.find(
																(c) =>
																	c.value ===
																	formik.values.machine1,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'machine1',
														val !== null && val.id,
													);
												}}
												invalidFeedback={formik.errors.machine1}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.machine1 && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.machine1}
											</p>
										)}
									</div>

									<div className='col-md-3'>
										<FormGroup
											id='machine2'
											label='mac'
											className='col-md-12'>
											<ReactSelect
												className='col-md-12'
												isClearable
												isLoading={machine2OptionsLoading}
												options={machine2Options}
												value={
													formik.values.machine2
														?machine2Options?.find(
																(c) =>
																	c.value ===
																	formik.values.machine2,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'machine2',
														val !== null && val.id,
													);
												}}
												invalidFeedback={formik.errors.machine2}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.machine2 && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.machine2}
											</p>
										)}
									</div>
									<div className='col-md-3'>
										<FormGroup id='model' label='model'>
											<ReactSelect
												isClearable
												classNamePrefix='select'
												isLoading={modelOptionsLoading}
												options={modelOptions}
												value={
													formik.values.model
														? modelOptions.find(
																(c) =>
																	c.value ===
																	formik.values.model,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'model',
														val !== null && val.id,
													);
												}}
												isTouched={formik.touched.model}
												invalidFeedback={formik.errors.model}
												validFeedback='Looks good!'
											/>
										</FormGroup>

										{formik.errors.model && (
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.model}
											</p>
										)}
									</div>
                                    
								</div>
								<div className='row g-2 mt-2  d-flex justify-content-start'>
                                <div className='col-md-3'>
										<FormGroup id='model3' label='model3'>
											<ReactSelect
												isClearable
												classNamePrefix='select'
												isLoading={modelOptionsLoading3}
												options={modelOptions3}
												value={
													formik.values.model3
														? modelOptions3.find(
																(c) =>
																	c.value ===
																	formik.values.model3,
														  )
														: null
												}
												onChange={(val) => {
													formik.setFieldValue(
														'model3',
														val !== null && val.id,
													);
												}}
												isTouched={formik.touched.model3}
												invalidFeedback={formik.errors.model3}
												validFeedback='Looks good!'
											/>
										</FormGroup>

										{formik.errors.model3 && (
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.model3}
											</p>
										)}
									</div>
                                    <div className='col-md-3'>
										<FormGroup id='po_no' label='Text box' className='col-md-12'>
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
									
								</div>

								<hr />
								{formik.values.childArray &&
									formik.values.childArray.map((childElements, index) => (
										// eslint-disable-next-line react/no-array-index-key
										<div className='row mt-2' key={index}>
											
											<div className='col-md-2'>
												<FormGroup
													// id={`childElements${index}`}
													id={`childArray[${index}].item`}
													label='Item'>
													<ReactSelect
														isClearable
														isLoading={
															childElements.itemsOptionsLoading
														}
														options={childElements.itemsOptions}
														value={childElements.item}
														onChange={(val) => {
															formik.setFieldValue(
																`childArray[${index}].item`,
																val,
															);
															clearUnit(index);
															getUnitsDropDown(val, index);
														}}
													/>
												</FormGroup>
												{formik.errors[`childArray[${index}]item`] && (
													// <div className='invalid-feedback'>
													<p
														style={{
															color: 'red',
														}}>
														{formik.errors[`childArray[${index}]item`]}
													</p>
												)}
											</div>
                                            <div className='col-md-2'>
												<FormGroup
													// id={`childElements${index}`}
													id={`childArray[${index}].item2`}
													label='Item2'>
													<ReactSelect
														isClearable
														isLoading={
															childElements.itemsOptionsLoading
														}
														options={childElements.itemsOptions}
														value={childElements.item2}
														onChange={(val) => {
															formik.setFieldValue(
																`childArray[${index}].item2`,
																val,
															);
															clearUnit(index);
															getUnitsDropDown2(val, index);
														}}
													/>
												</FormGroup>
												{formik.errors[`childArray[${index}]item2`] && (
													// <div className='invalid-feedback'>
													<p
														style={{
															color: 'red',
														}}>
														{formik.errors[`childArray[${index}]item2`]}
													</p>
												)}
											</div>
											<div className='col-md-2'>
												<FormGroup
													// id={`childElements${index}`}
													id={`childArray[${index}].unit`}
													label='Unit'>
													<Input
														readOnly
														type='text'
														onChange={formik.handleChange}
														value={childElements.unit}
														isTouched={formik.touched.unit}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>

											
											
											

											<div className='col-md-1'>
												<br />
												<div className='d-flex justify-content-center'>
													<Button
														isDisable={
															formik.values.childArray.length === 1
														}
														isLight
														icon='cancel'
														color='danger'
														onClick={() => removeRow(index)}
													/>
												</div>
											</div>
											<hr />
										</div>
									))}

								<div className='row g-4 d-flex align-items-end'>
									
									<div className='col-md-3 d-flex align-items-center'>
										<br />
										<Button
											color='primary'
											icon='add'
											onClick={() => {
												formik.setFieldValue('childArray', [
													...formik.values.childArray,
													{
														// subcategory: '',
														item: '',
														unit: '',
														item2: '',
														// quantity: '',
														// remarks: '',
														// subCategoriesOptions: [],
														// subCategoriesOptionsLoading: true,
														// existing_quantity: 0,
													},
												]);
												// getSubCategoriesbyCategory(
												// 	formik.values.childArray.length,
												// 	formik.values.category_id,
												// );
											}}>
											Add New Item
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
										color={lastSave ? 'info' : 'success'}
										isDisable={isLoading}
										onClick={formik.handleSubmit}>
										{isLoading && <Spinner isSmall inButton />}
										{isLoading
											? (lastSave && 'Saving') || 'Saving'
											: (lastSave && 'Save') || 'Save'}
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
