// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
import Select, { createFilter } from 'react-select';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';

// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';
import Input from '../../../../components/bootstrap/forms/Input';

import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardActions,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import showNotification from '../../../../components/extras/showNotification';

import { _titleError } from '../../../../notifyMessages/erroSuccess';

import View from './view';
import Add from './add';

export const searchByOptions = [{ value: 1, text: 'Id' }];
export const options = [
	{ id: 1, value: 1, label: 'abc' },
	{ id: 1, value: 1, label: 'def' },
	{ id: 1, value: 1, label: 'ghi' },
];

const Categories = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);

	const [tableData, setTableData] = useState([]);
	const [tableData2, setTableData2] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);
	const [oemNo, setOemNo] = useState('');
	const [oemNo2, setOemNo2] = useState('');
	const [machineOptions, setMachineOptions] = useState();
	const [selectedMachine, setSelectedMachine] = useState('');
	const [companyOptions, setCompanyOptions] = useState();
	const [selectedCompany, setSelectedCompany] = useState('');
	const [nameOptions, setNameOptions] = useState();
	const [selectedName, setSelectedName] = useState('');
	const [makeOptions, setMakeOptions] = useState();
	const [selectedMake, setSelectedMake] = useState('');
	const [modelOptions, setModelOptions] = useState();
	const [selectedModel, setSelectedModel] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [modelOptionsLoading, setModelOptionsLoading] = useState(false);

	const refreshTableData = () => {
		setTableDataLoading(true);
		Axios.get(
			`${baseURL}/getModelItemOem?records=${store.data.itemsManagementModule.itemParts.perPage}&pageNo=${store.data.itemsManagementModule.itemParts.pageNo}
			&colName=id&sort=asc&make_id=${selectedMake?selectedMake.id:''}&machine_id=${selectedMachine?selectedMachine.id:''}
			&model_id=${selectedModel?selectedModel.id:''}&item_id=${selectedName?selectedName.id:''}&primary=${oemNo}`,
			{},
		)
			.then((response) => {
				setTableData(response.data.data.data);
				setTableData2(response.data.data);
				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.data,
						'itemsManagementModule',
						'itemParts',
						'tableData',
					]),
				);
				console.log("res1",response,)
			})

			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});

	};
	useEffect(() => {
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
		Axios.get(`${baseURL}/getCompaniesDropDown`)
		.then((response) => {
			const rec = response.data.companies.map(({ id, name }) => ({
				id,
				company_id: id,
				value: id,
				label: name,
				
			}));
			setCompanyOptions(rec);
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
				setNameOptions(rec);
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
	useEffect(() => {
		setModelOptionsLoading(true);
		Axios.get(`${baseURL}/getMachineModelsDropDown?machine_id=${selectedMachine?selectedMachine.id:''}&make_id=${selectedMake?selectedMake.id:''}`)
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

	}, [selectedMachine,selectedMake]);

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.itemsManagementModule.itemParts.perPage,
		store.data.itemsManagementModule.itemParts.pageNo,
	]);

	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle> Parts List</CardTitle>
								</CardLabel>
								<CardActions>
									<Add refreshTableData={refreshTableData} />
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-3'>
										<FormGroup label='Item' id='name'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={nameOptions}
												isClearable
												value={selectedName}
												// onChange={(val) => {
												// 	if (val !== null) {
												// 		setSelectedName({ id: val.id });
												// 	} else {
												// 		setSelectedName({ id: '' });
												// 	}
												// }}
												onChange={(val) => {
													setSelectedName(val);
												}}
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup label='Machine' id='machine'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={machineOptions}
											isClearable
												value={selectedMachine}
												onChange={(val) => {
													
														setSelectedMachine(val);
													
												}}
											
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div>
									
									<div className='col-md-3'>
										<FormGroup label='Make' id='make'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={makeOptions}
											isClearable
												value={selectedMake}
												onChange={(val) => {
													setSelectedMake(val);

												}}
												
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div> 
									<div className='col-md-3'>
										<FormGroup label='Model' id='model'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={modelOptions}
												isLoading={modelOptionsLoading}
											isClearable
												value={selectedModel}
												onChange={(val) => {
													
						                 	setSelectedModel(val);
													
												}}
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div> 
									
									</div>

									<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-2'>
										<FormGroup label='OEM Num' id='oem_num'>
											<Input
												id='oemFileNo'
												type='text'
												onChange={(e) => {
													setOemNo(e.target.value);
												}}
												value={oemNo}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<FormGroup label='Companies' id='companies'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={companyOptions}
											isClearable
												value={selectedCompany}
												onChange={(val) => {
													
						                 	setSelectedCompany( val);
													
												}}
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div> 
									{/* <div className='col-md-2'>
										<FormGroup label='Name' id='searchFileNo'>
											<Input
												id='searchFileNo'
												type='text'
												onChange={(e) => {
													setSearchNo(e.target.value);
												}}
												value={searchNo}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div> */}
									<div className='col-md-2'>
										<FormGroup label='OEM Number' id='oem_id2'>
											<Input
												id='oem2FileNo'
												type='text'
												onChange={(e) => {
													setOemNo2(e.target.value);
												}}
												value={oemNo2}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-2'>
										<Button
											color='primary'
											onClick={() => refreshTableData()}
											isOutline
											// isDisable={landsViewLoading}
											isActive>
											Search
										</Button>
									</div>
								</div>
							</CardBody>
							<View
								tableData={tableData}
								tableData2={tableData2}
								refreshTableData={refreshTableData}
								tableDataLoading={tableDataLoading}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Categories;
