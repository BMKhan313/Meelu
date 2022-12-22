// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';
import { ButtonGroup } from '../../../../components/bootstrap/Button';
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
import Add1 from './add1';

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
	const refreshTableData = () => {
		setTableDataLoading(true);
		Axios.get(
			`${baseURL}/getKitInventory?records=${store.data.inventoryManagementModule.kits.perPage}&pageNo=${store.data.inventoryManagementModule.kits.pageNo}&colName=id&sort=asc`,
			{},
		)
			.then((response) => {
				setTableData(response.data.KitInventory);
				// setTableData2(response.data.KitInventory);
				// console.log('bmk::tbdata::', response.data.KitInventory.data);
				// console.log('bmk::tbdata2::', response.data.KitInventory);
				setTableDataLoading(false);
				dispatch(
					updateSingleState([
						response.data.KitInventory,
						'inventoryManagementModule',
						'kits',
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
		store.data.inventoryManagementModule.kits.perPage,
		store.data.inventoryManagementModule.kits.pageNo,
	]);

	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle> Inventory Kits</CardTitle>
								</CardLabel>
								<CardActions>
									<ButtonGroup>
										<div className='mx-3'>
											<Add refreshTableData={refreshTableData} />
										</div>

										<Add1 />
									</ButtonGroup>
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
