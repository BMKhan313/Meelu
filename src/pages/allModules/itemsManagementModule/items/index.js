// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

// ** Axios Imports
import { useDispatch, useSelector } from 'react-redux';
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
	};

	// const searchFilterTrigger = () => {
	// 	setTableDataLoading(true);

	// 	apiClient
	// 		.get(`api/getSubCategories?${searchBy === '1' && `id=${searchNo}`}`)
	// 		.then((response) => {
	// 			setTableData(response.data.subCategories);
	// 			// setRecords(1);
	// 			setTableDataLoading(false);
	// 		})
	// 		// eslint-disable-next-line no-console
	// 		.catch((err) => {
	// 			showNotification(_titleError, err.message, 'Danger');
	// 			if (err.response.status === 401) {
	// 				showNotification(_titleError, err.response.data.message, 'Danger');

	// 				Cookies.remove('userToken');
	// 				navigate(`/${demoPages.login.path}`, { replace: true });
	// 			}
	// 		});
	// };

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store.data.inventory.categories.perPage, store.data.inventory.categories.pageNo]);

	return (
		<PageWrapper>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle> Categories</CardTitle>
								</CardLabel>
								<CardActions>
									<Add refreshTableData={refreshTableData} />
								</CardActions>
							</CardHeader>
							<CardBody>
								<br />
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
								{/* <div className='row g-4'>
									<div className='col-md-2'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setSearchBy(e.target.value);
											}}
											value={searchBy}
											list={searchByOptions}
										/>
									</div>
									<div className='col-md-2'>
										<Input
											id='searchFileNo'
											type='text'
											onChange={(e) => {
												setSearchNo(e.target.value);
											}}
											value={searchNo}
											validFeedback='Looks good!'
										/>
									</div>
									<div className='col-md-2'>
										<Button
											color='primary'
											onClick={() => searchFilterTrigger()}
											isOutline
											// isDisable={landsViewLoading}
											isActive>
											Search
										</Button>
									</div>
								</div> */}
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
