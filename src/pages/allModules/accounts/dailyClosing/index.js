// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';
import Spinner from '../../../../components/bootstrap/Spinner';
import { componentsMenu } from '../../../../menu';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import 'flatpickr/dist/themes/light.css';

// ** Reactstrap Imports
// ** Axios Imports
import baseURL from '../../../../baseURL/baseURL';
import Icon from '../../../../components/icon/Icon';

import showNotification from '../../../../components/extras/showNotification';
import GeneratePDF4 from './Report';

export const _selectOptions = [
	{ value: 1, text: 'Voucher No' },
	// { value: 2, text: 'Mutation No' },
	// { value: 3, text: 'Khasra No' },
];

const DashboardPage = () => {
	// let currentBalance = 0;

	const [dailyClosingDate, setDailyClosingDate] = useState(moment().format('DD/MM/YY'));
	const [dailyClosingDate2, setDailyClosingDate2] = useState(moment());
	const [isPrintAllReportLoading, setIsPrintAllReportLoading] = useState(false);

	const [accountSelected, setAccountSelected] = useState(null);
	const [accountOptions, setAccountOptions] = useState('');
	const [accountOptionsLoading, setAccountOptionsLoading] = useState(true);

	const _titleSuccess = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Record Saved Successfully</span>
		</span>
	);
	const _titleError = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Error Saving Record </span>
		</span>
	);
	useEffect(() => {
		setAccountSelected(null);
		setAccountOptionsLoading(true);
		setAccountOptions([]);
		Axios.get(`${baseURL}/getCashAccounts`)
			.then((response) => {
				const rec = response.data.coaAccounts.map(({ id, name, code }) => ({
					id,
					value: id,
					name,
					label: `${code}-${name}`,
				}));
				// if (rec.length > 0) setAccountSelected(rec[0]);
				setAccountOptions(rec);
				setAccountOptionsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const getDailyClosing = (docType) => {
		setIsPrintAllReportLoading(true);

		const url = `${baseURL}/getDailyClosingReport`;
		const data = { date: dailyClosingDate, coaAccounts: accountSelected };
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(data),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				console.log('hhhhh', res);
				if (res.status === 'ok') {
					Axios.get(
						`${baseURL}/getVouchers?
					
		
					coa_sub_group_id=2
					&from=${dailyClosingDate}&to=${dailyClosingDate}
				 &is_post_dated=3
				
					`,
					)
						.then((response2) => {
							GeneratePDF4(res, dailyClosingDate2, response2.data.vouchers, docType);
							showNotification(_titleSuccess, 'Printing', 'success');
							setIsPrintAllReportLoading(false);
						})
						.catch((err) => console.log(err));
				} else {
					setIsPrintAllReportLoading(false);

					showNotification(_titleError, res.message, 'danger');
					console.log('Error');
				}
			})
			.catch((err) => console.log(err));
	};

	// const { items, requestSort, getClassNamesFor } = useSortableData(generalJournal);

	return (
		<PageWrapper title={componentsMenu.components.subMenu.table.text}>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>Daily Closing Report</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<div className='col-12'>
										<div className='col-12'>
											<div className='row g-4'>
												<h4>Filter</h4>
												<div className='col-md-2'>
													<FormGroup label='Date' id='DateBalanceSheet'>
														<Flatpickr
															className='form-control'
															value={dailyClosingDate}
															// eslint-disable-next-line react/jsx-boolean-value

															options={{
																dateFormat: 'd/m/y',
																allowInput: true,
															}}
															onChange={(date, dateStr) => {
																setDailyClosingDate(dateStr);
																setDailyClosingDate2(date[0]);
															}}
															onClose={(date, dateStr) => {
																setDailyClosingDate(dateStr);
																setDailyClosingDate2(date[0]);
															}}
															id='default-picker'
														/>
													</FormGroup>
												</div>
												<div className='col-md-4'>
													<FormGroup label='Account' id='account'>
														<Select
															className='col-md-11'
															isClearable
															isMulti
															classNamePrefix='select'
															options={accountOptions}
															isLoading={accountOptionsLoading}
															value={accountSelected}
															onChange={(val) => {
																setAccountSelected(val);
															}}
														/>
													</FormGroup>
													{accountSelected?.length > 5 && (
														<p className='bg-danger border border-2 badge p-2 me-2'>
															Note: Accounts more than 5 will be
															printed on A3 page.
														</p>
													)}
												</div>
												<div className='col-md-2'>
													<br />
													<Button
														isOutline
														color='primary'
														// isLight={darkModeStatus}
														className={classNames('text-nowrap', {
															'border-light': true,
														})}
														icon={!isPrintAllReportLoading && 'Preview'}
														isDisable={isPrintAllReportLoading}
														onClick={() => getDailyClosing(2)}>
														{isPrintAllReportLoading && (
															<Spinner isSmall inButton />
														)}
														{isPrintAllReportLoading
															? 'Generating PDF...'
															: 'View  PDF'}
													</Button>
												</div>
											</div>
											<br />
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
