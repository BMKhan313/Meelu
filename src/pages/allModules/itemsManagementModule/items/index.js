// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
import Select, { createFilter } from 'react-select';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';
import Button from '../../../../components/bootstrap/Button';
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
// export const categoryOptions = [
// 	{ value: 0, text: 'qqq' },
// 	{ value: 1, text: 'www' },
// 	{ value: 2, text: 'eee' },
// ];

const Categories = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [itemOptions, setItemOptions] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedItem, setSelectedItem] = useState('');
	const [tableData, setTableData] = useState([]);
	const [tableData2, setTableData2] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);

	const refreshTableData = () => {
		setTableDataLoading(true);
		Axios.get(
			`${baseURL}/getMachineParts?records=${store.data.itemsManagementModule.items.perPage}&pageNo=${store.data.itemsManagementModule.items.pageNo}&colName=id&sort=asc`,
			{},
		)
			.then((response) => {
				setTableData(response.data.machine_Parts.data);
				setTableData2(response.data.machine_Parts);
				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.machine_Parts,
						'itemsManagementModule',
						'items',
						'tableData',
					]),
				);
			})

			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
	};

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.itemsManagementModule.items.perPage,
		store.data.itemsManagementModule.items.pageNo,
	]);

	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>Item List</CardTitle>
								</CardLabel>
								<CardActions>
									<Add refreshTableData={refreshTableData} />
								</CardActions>
							</CardHeader>
							<CardBody>
								{/* <div className='row g-4'>
									<FormGroup className='col-md-2' label='Category'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setCategoryOptionsSelected({
													value: e.target.value,
												});
											}}
											value={categoryOptionsSelected.value}
											list={categoryOptions}
										/>
									</FormGroup>
								</div> */}
								<br />

								<br />
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-3'>
										<FormGroup label='Machine' id='machine'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={categoryOptions}
												isClearable
												value={selectedCategory}
												onChange={(val) => {
													setCategoryOptions(val);
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
												options={itemOptions}
												isClearable
												value={selectedItem}
												onChange={(val) => {
													setItemOptions(val);
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
