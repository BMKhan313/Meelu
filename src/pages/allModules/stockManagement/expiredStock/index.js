
import React, { useState } from 'react';
// import Axios from 'axios';
import Select from 'react-select';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

import Add from './add';
import View from './view';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';

import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
// ** Axios Imports


// import ViewEmployees from './viewEmployees';

const TablePage = () => {
	// const [tableRecords, setTableRecords] = useState([]);
	// const [tableRecordsLoading, setTableRecordsLoading] = useState([]);
	// const [refreshTableRecords, setRefreshTableRecords] = useState(0);

	// const [departmentsOptions, setDepartmentsOptions] = useState([]);
	// const [departmentsOptionsLoading, setDepartmentsOptionsLoading] = useState(true);
	// const [departmentSelected, setDepartmentSelected] = useState(null);

	const [typeOptionSelected, setTypeOptionSelected] = useState(null);
  const [typeOptionSelected2, setTypeOptionSelected2] = useState(null);

	// const refreshTableRecordsHandler = (arg) => {
	// 	setRefreshTableRecords(arg);
	// };

	const typeOptions = [
		{
			id: 1,
			value: 1,
			label: 'Advance Salary',
		},
		{
			id: 2,
			value: 2,
			label: 'Loan',
		},
	];
  const typeOptions2 = [
		{
			id: 1,
			value: 1,
			label: 'Advance Salary2',
		},
		{
			id: 2,
			value: 2,
			label: 'Loan2',
		},
	];
	// useEffect(() => {
	// 	setTableRecordsLoading(true);

	// // 	Axios.get(`${baseURL}/getAdvanceSalaryAndLoan`)
	// // 		.then((response) => {
	// // 			setTableRecords(response.data.vouchers);
	// // 			setTableRecordsLoading(false);
	// // 		})
	// // 		.catch((err) => console.log(err));

	// // 	Axios.get(`${baseURL}/getDepartments`)
	// // 		.then((response) => {
	// // 			const rec = response.data.departments.map(({ id, name }) => ({
	// // 				id,
	// // 				value: id,
	// // 				label: name,
	// // 			}));
	// // 			setDepartmentsOptions(rec);
	// // 			setDepartmentsOptionsLoading(false);
	// // 		})
	// // 		.catch((err) => console.log(err));
	// // }, []);
	// // useEffect(() => {
	// // 	setTableRecordsLoading(true);

	// // 	Axios.get(
	// // 		`${baseURL}/getAdvanceSalaryAndLoan?department_id=${
	// // 			departmentSelected !== null ? departmentSelected.id : ''
	// // 		}&type=${typeOptionSelected !== null ? typeOptionSelected.id : ''}`,
	// // 	)
	// // 		.then((response) => {
	// // 			setTableRecords(response.data.vouchers);
	// // 			setTableRecordsLoading(false);
	// // 		})
	// // 		.catch((err) => console.log(err));
	// }, [departmentSelected, typeOptionSelected, refreshTableRecords]);

	return (
		<PageWrapper>
			<Page>
				<Card shadow='none' className='border-0'>
					<CardHeader className='px-0 pt-0'>
						<CardLabel icon='Person' iconColor='danger'>
							<CardTitle>
								Employees <small>Small</small>
							</CardTitle>
							<CardSubTitle>Subtitle</CardSubTitle>
						</CardLabel>
						<CardActions>
							<Add
								// refreshTableRecordsHandler={refreshTableRecordsHandler}
								// refreshTableRecords={refreshTableRecords}
								// tableRecordsLoading={tableRecordsLoading}
								// tableRecords={tableRecords}
							/>

							<ButtonGroup>
								<Dropdown>
									<DropdownToggle hasIcon={false}>
										<Button
											color='danger'
											isLight
											hoverShadow='default'
											icon='MoreVert'
										/>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd>
										<DropdownItem isHeader>Other Actions</DropdownItem>
										<DropdownItem>
											{/* <NavLink to='/components/popovers'>
																			<Icon icon='Send' />{' '}
																			Popover
																		</NavLink> */}
											Other Actions 2
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</ButtonGroup>
						</CardActions>
					</CardHeader>
					<CardBody className='px-0'>
						<>
							<div className='row g-4'>
								<div className='col-md-3'>
									<FormGroup label='Department' id='mainGroup'>
										<Select
											className='col-md-11'
											isClearable
											classNamePrefix='select'
											// options={departmentsOptions}
											// isLoading={departmentsOptionsLoading}
                      options={typeOptions}
											value={typeOptionSelected}
											onChange={(val) => {
												console.log(':::', val);
                        setTypeOptionSelected(val);
											}}
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup label='Adv Salary/ Loan' id='filter'>
										<Select
											isClearable
											className='col-md-11'
											classNamePrefix='select'
											options={typeOptions2}
											value={typeOptionSelected2}
											onChange={(val) => {
												setTypeOptionSelected2(val);
											}}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row'>
								<div className='col-12'>
									<Card>
										{/* <CardHeader>
																<CardLabel icon='Assignment'>
																	<CardTitle>
																		Accounts Subgroups
																	</CardTitle>
																</CardLabel>
															</CardHeader> */}

										<View
											// refreshTableRecordsHandler={refreshTableRecordsHandler}
											// refreshTableRecords={refreshTableRecords}
											// tableRecordsLoading={tableRecordsLoading}
											// tableRecords={tableRecords}
										/>
									</Card>
								</div>
							</div>
						</>
					</CardBody>
					<CardFooter className='px-0 pb-0'>
						<CardFooterLeft />
						<CardFooterRight />
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TablePage;