// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
import Select, { createFilter } from 'react-select';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';
import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';

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
export const categoryOptions = [
	{ value: 0, text: 'qqq' },
	{ value: 1, text: 'www' },
	{ value: 2, text: 'eee' },
];

const Categories = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);

	const [tableData, setTableData] = useState([]);
	const [tableData2, setTableData2] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);
	const [storeTypeOptions, setStoreTypeOptions] = useState();
	const [nameOptions, setNameOptions] = useState();
	const [nameLoading, setNameLoading] = useState(false);
	const [selectedName, setSelectedName] = useState('');
	const [selectedStore, setSelectedStore] = useState('');
	const refreshTableData = () => {
		setTableDataLoading(true);
		Axios.get(
			`${baseURL}/getItemsInventory?records=${
				store.data.inventoryManagementModule.parts.perPage
			}&pageNo=${
				store.data.inventoryManagementModule.parts.pageNo
			}&colName=id&sort=asc&store_type_id=${selectedStore ? selectedStore.id : ''}&store_id=${
				selectedName ? selectedName.id : ''
			}`,
			{},
		)
			.then((response) => {
				setTableData(response.data.itemsInventory.data);
				setTableData2(response.data.itemsInventory);
				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.itemsInventory,
						'inventoryManagementModule',
						'parts',
						'tableData',
					]),
				);
			})

			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
	};
	useEffect(() => {
		setNameLoading(true);
		Axios.get(
			`${baseURL}/getStoredropdown?store_type_id=${selectedStore ? selectedStore.id : ''}`,
		)
			.then((response) => {
				const rec = response.data.store.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setNameOptions(rec);
				setNameLoading(false);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});
	}, [selectedStore]);
	useEffect(() => {
		refreshTableData();
		Axios.get(`${baseURL}/getStoreTypeDropDown`)
			.then((response) => {
				const rec = response.data.storeType.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setStoreTypeOptions(rec);
			})

			// eslint-disable-next-line no-console
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.response.status === 401) {
					showNotification(_titleError, err.response.data.message, 'Danger');
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.inventoryManagementModule.kits.perPage,
		store.data.inventoryManagementModule.kits.pageNo,
	]);

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.inventoryManagementModule.parts.perPage,
		store.data.inventoryManagementModule.parts.pageNo,
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
										<FormGroup label='Store Type' id='type_id'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={storeTypeOptions}
												isClearable
												value={selectedStore}
												onChange={(val) => {
													setSelectedStore(val);
													setSelectedName('');
												}}
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup label='Name' id='name'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={nameOptions}
												isLoading={nameLoading}
												isClearable
												value={selectedName}
												onChange={(val) => {
													setSelectedName(val);
												}}
												filterOption={createFilter({ matchFrom: 'start' })}
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
								<br />

								<br />
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
