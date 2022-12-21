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
	const [searchNo, setSearchNo] = useState('');

	const [selectedOption, setSelectedOption] = useState('');

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
								<div className='row g-4 d-flex align-items-end'>
									<div className='col-md-2'>
										<FormGroup label='Filter' id='filterId'>
											<Select
												className='col-md-12'
												classNamePrefix='select'
												options={options}
												isClearable
												value={selectedOption}
												onChange={(val) => {
													setSelectedOption(val);
												}}
												filterOption={createFilter({ matchFrom: 'start' })}
											/>
										</FormGroup>
									</div>

									<div className='col-md-2'>
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
