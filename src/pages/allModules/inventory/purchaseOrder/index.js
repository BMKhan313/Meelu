/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect, { createFilter } from 'react-select';
import { useFormik } from 'formik';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Button from '../../../../components/bootstrap/Button';
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
	const [kitOptions, setKitOptions] = useState([]);
	const [kitOptionsLoading, setKitOptionsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState({
		id: '',
		value: '',
		label: '',
	});
	const refreshTableData = () => {
		setTableDataLoading(true);
		// Axios.get(
		// 	`${baseURL}/getKits?records=${store.data.kitManagement.defineKit.perPage}&pageNo=${store.data.kitManagement.defineKit.pageNo}&colName=id&sort=asc&id=${selectedItem.id}`,
		// )
		Axios.get(
			`${baseURL}/getPolist?records=${store.data.purchaseOrderManagement.purchaseList.perPage}&pageNo=${store.data.purchaseOrderManagement.purchaseList.pageNo}&colName=id&sort=desc&id=${selectedItem.id}`,
		)
			.then((response) => {
				// console.log('myres::', response.data.purchaseorderlist);
				setTableData(response.data.purchaseorderlist.data);
				setTableData2(response.data.purchaseorderlist);
				// console.log('bmk::tbdata::', response.data.data.data);
				// console.log('bmk::tbdata2::', response.data.data);
				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.purchaseorderlist,
						'purchaseOrderManagement',
						'purchaseList',
						'tableData',
					]),
				);
			})

			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
	};
	useEffect(() => {
		Axios.get(`${baseURL}/getkitsDropdown`)

			.then((response) => {
				// console.log('bnnn::', response.data);
				const rec = response.data.kitsDropdown.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setKitOptions(rec);
				setKitOptionsLoading(false);
			})
			// eslint-disable-next-line no-console
			.catch((err) => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const formik = useFormik({
		initialValues: {
			name: '',
			kit_name: '',
		},
		// onSubmit: () => {
		// 	setIsLoading(true);
		// 	setTimeout(handleSave, 2000);
		// },
	});

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		store.data.purchaseOrderManagement.purchaseList.perPage,
		store.data.purchaseOrderManagement.purchaseList.pageNo,
	]);

	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle> Purchase Orders </CardTitle>
								</CardLabel>
								<CardActions>
									<Add refreshTableData={refreshTableData} />
								</CardActions>
							</CardHeader>
							<CardBody>
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-3'>
										<FormGroup label='Filter' id='kit_name'>
											<ReactSelect
												className='col-md-12'
												classNamePrefix='select'
												options={kitOptions}
												isLoading={kitOptionsLoading}
												isClearable
												value={null}
												onChange={(val) => {
													if (val !== null) {
														// console.log('bm::', val.id);
														setSelectedItem({ id: val.id });
													} else {
														setSelectedItem({ id: '' });
													}
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
											isActive>
											Search
										</Button>
									</div>
								</div>
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
