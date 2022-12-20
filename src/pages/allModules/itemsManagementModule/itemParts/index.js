import React, { useEffect, useState } from 'react';

// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';

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

	const refreshTableData = () => {
		setTableDataLoading(true);
		Axios.get(
			`${baseURL}/getModelItemOem?records=${store.data.itemsManagementModule.itemParts.perPage}&pageNo=${store.data.itemsManagementModule.itemParts.pageNo}&colName=id&sort=asc`,
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
			})

			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
	};

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
