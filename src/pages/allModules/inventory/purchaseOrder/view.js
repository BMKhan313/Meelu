/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { baseURL, Axios } from '../../../../baseURL/authMultiExport';

// eslint-disable-next-line import/no-unresolved
import { updateSingleState } from '../../redux/tableCrud/index';
// ** Axios Imports

import { _titleError } from '../../../../notifyMessages/erroSuccess';
import showNotification from '../../../../components/extras/showNotification';

import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';

import Checks from '../../../../components/bootstrap/forms/Checks';
import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import PaginationButtons from '../../../../components/PaginationButtons';
import useSelectTable from '../../../../hooks/useSelectTable';

import Spinner from '../../../../components/bootstrap/Spinner';
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
	ModalFooter,
} from '../../../../components/bootstrap/Modal';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
} from '../../../../components/bootstrap/Card';
import Edit from './edit';
import Received from './received';
import ReturnOrder from './ReturnOrder';

const View = ({ tableDataLoading, tableData, refreshTableData }) => {
	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const store = useSelector((state) => state.tableCrud);
	const [perPage, setPerPage] = useState(
		Number(store.data.purchaseOrderManagement.purchaseList.perPage),
	);
	const [editingItemLoading, setEditingItemLoading] = useState(false);
	const { selectTable, SelectAllCheck } = useSelectTable(tableData);
	const [poNo, setPoNo] = useState('');
	const [editingItem, setEditingItem] = useState({});
	const [itemId, setItemId] = useState('');
	const [deleteLoading, setDeleteLoading] = useState(false);

	const [recievedItemLoading, setRecievedItemLoading] = useState(false);
	const [recievedItem, setRecievedItem] = useState({});
	const [stateRecieve, setStateReceive] = useState(false);
	const [returnData, setReturnData] = useState({});
	const [stateReturn, setStateReturn] = useState(false);
	const [returnItemsLoading, setReturnItemsLoading] = useState(false);
	// Edit
	const [stateEdit, setStateEdit] = useState(false);

	const [staticBackdropStatusEdit, setStaticBackdropStatusEdit] = useState(true);
	const [scrollableStatusEdit, setScrollableStatusEdit] = useState(false);
	const [centeredStatusEdit, setCenteredStatusEdit] = useState(false);
	const [fullScreenStatusEdit, setFullScreenStatusEdit] = useState(null);
	const [animationStatusEdit, setAnimationStatusEdit] = useState(true);

	const [headerCloseStatusEdit, setHeaderCloseStatusEdit] = useState(true);
	const [headerCloseStatusReturn, setHeaderCloseStatusReturn] = useState(true);

	const initialStatusEdit = () => {
		setStaticBackdropStatusEdit(true);
		setScrollableStatusEdit(false);
		setCenteredStatusEdit(false);
		setFullScreenStatusEdit(false);
		setAnimationStatusEdit(true);
		setHeaderCloseStatusEdit(true);
	};

	const handleStateEdit = (status) => {
		refreshTableData();
		setStateEdit(status);
	};
	// delete
	const [stateDelete, setStateDelete] = useState(false);

	const [staticBackdropStatusDelete, setStaticBackdropStatusDelete] = useState(false);
	const [scrollableStatusDelete, setScrollableStatusDelete] = useState(false);
	const [centeredStatusDelete, setCenteredStatusDelete] = useState(false);
	const [sizeStatusDelete, setSizeStatusDelete] = useState(null);
	const [fullScreenStatusDelete, setFullScreenStatusDelete] = useState(null);
	const [animationStatusDelete, setAnimationStatusDelete] = useState(true);
	const [headerCloseStatusDelete, setHeaderCloseStatusDelete] = useState(true);
	// initiate
	const [staticBackdropStatusInitiate, setStaticBackdropStatusReceive] = useState(false);
	const [scrollableStatusInitiate, setScrollableStatusInitiate] = useState(false);
	const [centeredStatusInitiate, setCenteredStatusInitiate] = useState(false);
	const [sizeStatusInitiate, setSizeStatusInitiate] = useState(null);
	const [fullScreenStatusInitiate, setFullScreenStatusInitiate] = useState(null);
	const [animationStatusInitiate, setAnimationStatusInitiate] = useState(true);

	const [headerCloseStatusInitiate, setHeaderCloseStatusInitiate] = useState(true);

	const initialStatusDelete = () => {
		setStaticBackdropStatusDelete(false);
		setScrollableStatusDelete(false);
		setCenteredStatusDelete(false);
		setSizeStatusDelete('md');
		setFullScreenStatusDelete(null);
		setAnimationStatusDelete(true);
		setHeaderCloseStatusInitiate(true);
	};
	const initialStatusReceive = () => {
		setStaticBackdropStatusReceive(false);
		setScrollableStatusInitiate(false);
		setCenteredStatusInitiate(false);
		setSizeStatusInitiate('md');
		setFullScreenStatusInitiate(null);
		setAnimationStatusInitiate(true);
		setHeaderCloseStatusInitiate(true);
	};
	const handleStateRecieved = (status) => {
		refreshTableData();
		setStateReceive(status);
	};

	const initialStatusReturn = () => {
		setHeaderCloseStatusReturn(true);
	};

	const handleStateReturn = (status) => {
		refreshTableData();
		setStateReceive(status);
	};
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	const getEditingItem = (idd) => {
		setEditingItemLoading(true);
		Axios.get(`${baseURL}/editPurchaseOrder?id=${idd}`)
			.then((res) => {
				setEditingItem(res.data.data);
				setEditingItemLoading(false);
			})
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
	};
	const getReceivedFunc = (idd) => {
		setRecievedItemLoading(true);
		Axios.get(`${baseURL}/editPurchaseOrder?id=${idd}`)
			.then((res) => {
				// console.log('recev state', res.data.data);
				setRecievedItem(res.data.data);
				setRecievedItemLoading(false);
			})
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
	};
	const getReturnFunc = (idd) => {
		setReturnItemsLoading(true);
		Axios.get(`${baseURL}/editPurchaseOrder?id=${idd}`)
			.then((res) => {
				// console.log('recev state', res.data.data);
				setReturnData(res.data.data);
				setReturnItemsLoading(false);
			})
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
			});
	};
	// const getReceivedFunc = (id) => {
	// 	setIsLoading(true);
	// 	Axios.get(`${baseURL}/editPurchaseOrder?id=${id}`)
	// 		.then((response) => {
	// 			showNotification('Success', response.data.message, 'success');
	// 			setRecievedItem(response.data.data);
	// 			setStateReceive(false);
	// 			refreshTableData();
	// 			setRecievedItemLoading(false);
	// 		})

	// 		.catch((err) => {
	// 			setRecievedItemLoading(false);

	// 			showNotification('Error', err.message, 'danger');
	// 		});
	// };

	const deleteItem = (id) => {
		Axios.delete(`${baseURL}/deletePurchaseOrder?id=${id}`)
			.then((res) => {
				if (res.data.status === 'ok') {
					showNotification('Deleted', res.data.message, 'success');
					refreshTableData();
					setStateDelete(false);
					setDeleteLoading(false);
				} else if (res.data.status === 'error') {
					showNotification('Error', res.data.message, 'danger');
					refreshTableData();
					setStateDelete(false);
					setDeleteLoading(false);
				}
			})
			.catch((err) => {
				showNotification(_titleError, err.message, 'Danger');
				if (err.res.status === 401) {
					showNotification(_titleError, err.res.data.message, 'Danger');
				}
			});
	};

	useEffect(
		() => {
			dispatch(
				updateSingleState([perPage, 'purchaseOrderManagement', 'purchaseList', 'perPage']),
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[perPage],
	);

	const handlePageChange = (e) => {
		dispatch(updateSingleState([e, 'purchaseOrderManagement', 'purchaseList', 'pageNo']));
	};

	return (
		<>
			<CardBody className='table-responsive'>
				<table className='table table-modern'>
					<thead>
						<tr>
							<th style={{ width: 50 }}>{SelectAllCheck}</th>
							<th>S.NO</th>
							<th>PO.No</th>
							<th>Suppliers</th>
							<th>Store</th>
							<th>Request Date</th>
							<th>Remarks</th>
							<th>Actions</th>
						</tr>
					</thead>
					{tableDataLoading ? (
						<tbody>
							<tr>
								<td colSpan='12'>
									<div className='d-flex justify-content-center'>
										<Spinner color='primary' size='3rem' />
									</div>
								</td>
							</tr>
						</tbody>
					) : (
						<tbody>
							{store.data.purchaseOrderManagement.purchaseList.tableData.data.map(
								(item, index) => (
									<tr key={item.po_no}>
										<td>
											<Checks
												id={item.id.toString()}
												name='selectedList'
												value={item.id}
												onChange={selectTable.handleChange}
												checked={selectTable.values.selectedList.includes(
													item.id.toString(),
												)}
											/>
										</td>
										<td>{index + 1}</td>
										<td>{item.po_no}</td>
										<td>{item?.supplier?.name}</td>
										<td>{item?.store?.name}</td>
										<td>{moment(item.created_at).format('DD-MM-YYYY')}</td>
										<td>{item.remarks}</td>
										<td>
											<ButtonGroup>
												<Button
													// isDisable={item.isApproved === 1}
													onClick={() => {
														getEditingItem(item.id);
														setItemId(item.id);

														initialStatusEdit();
														setStateEdit(true);
														setStaticBackdropStatusEdit(true);
													}}
													color={
														item.is_received === 1
															? 'success'
															: 'success'
													}
													isDisable={
														item.confirmed1 === 0 ||
														item.is_received === 1
														// Cookies.get('role') !== 'Admin_'
													}
													isOutline
													// color='primary'
													className={classNames('text-nowrap', {
														'border-light': true,
													})}>
													Edit
												</Button>
												<Button
													isOutline
													// color='primary'
													className={classNames('text-nowrap', {
														'border-light': true,
													})}
													color={
														item.is_received === 1 ? 'danger' : 'danger'
													}
													isDisable={
														item.confirmed1 === 0 ||
														item.is_received === 1
														// Cookies.get('role') !== 'Admin_'
													}
													// icon='Delete'
													onClick={() => {
														setItemId(item.id);

														initialStatusDelete();

														setStateDelete(true);
														setStaticBackdropStatusDelete(false);
													}}>
													Delete
												</Button>

												<Button
													color={
														item.is_received === 1
															? 'success'
															: 'warning'
													}
													isDisable={
														item.confirmed1 === 0 ||
														item.is_received === 1
														// Cookies.get('role') !== 'Admin_'
													}
													// isLight={darkModeStatus}
													className={classNames('text-nowrap', {
														'border-light': true,
													})}
													icon={
														item.is_received === 1
															? 'DoneOutline'
															: 'PendingActions'
													}
													onClick={() => {
														getReceivedFunc(item.id);
														setItemId(item.id);

														setPoNo(item.po_no);
														// item.booking.plot.reg_no,
														// initialStatusEdit();
														// setStateEdit(true);
														// setStaticBackdropStatusEdit(true);
														// getReceivedFunc();
														initialStatusReceive();

														setStateReceive(true);
														setStaticBackdropStatusReceive(false);
													}}>
													{item.is_received === 1
														? 'Received'
														: 'Receive'}
												</Button>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button
															color='primary'
															isLight
															hoverShadow='default'
															icon='MoreVert'
														/>
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														{item.is_received === 1 ? (
															<DropdownItem
																onClick={() => {
																	initialStatusReturn();
																	setStateReturn(true);
																	getReturnFunc(item.id);
																}}>
																Return
															</DropdownItem>
														) : (
															''
														)}

														<DropdownItem>View</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</ButtonGroup>
										</td>
									</tr>
								),
							)}
						</tbody>
					)}
				</table>

				<PaginationButtons
					label='purchase'
					from={store.data.purchaseOrderManagement.purchaseList.tableData?.from ?? 1}
					to={store.data.purchaseOrderManagement.purchaseList.tableData?.to ?? 1}
					total={store.data.purchaseOrderManagement.purchaseList.tableData?.total ?? 0}
					perPage={Number(perPage ?? 10)}
					setPerPage={setPerPage}
				/>

				<div className='row d-flex justify-content-end'>
					<div className='col-md-4'>
						<Pagination
							activePage={
								store.data.purchaseOrderManagement.purchaseList?.pageNo ?? 1
							}
							totalItemsCount={
								store.data.purchaseOrderManagement.purchaseList?.tableData?.total ??
								0
							}
							itemsCountPerPage={Number(
								store.data.purchaseOrderManagement.purchaseList?.perPage ?? 10,
							)}
							onChange={(e) => handlePageChange(e)}
							itemClass='page-item'
							linkClass='page-link'
							firstPageText='First'
							lastPageText='Last'
							nextPageText='Next'
							prevPageText='Prev'
						/>
					</div>
				</div>
			</CardBody>
			<Modal
				isOpen={stateDelete}
				setIsOpen={setStateDelete}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatusDelete}
				isScrollable={scrollableStatusDelete}
				isCentered={centeredStatusDelete}
				size={sizeStatusDelete}
				fullScreen={fullScreenStatusDelete}
				isAnimation={animationStatusDelete}>
				<ModalHeader setIsOpen={headerCloseStatusDelete ? setStateDelete : null}>
					<ModalTitle id='deltefile'>
						{' '}
						<CardHeader>
							<CardLabel icon='Delete' iconColor='info'>
								<CardTitle>
									Deletion Confirmation
									<small> Item Id: {itemId}</small>
								</CardTitle>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							<Card>
								<CardBody>
									<h5>
										Are you sure, you want to delete the selected Purchase
										Order? <br />
										This cannot be undone!
									</h5>
								</CardBody>
								<CardFooter>
									<CardFooterLeft>
										<Button
											color='info'
											icon='cancel'
											isOutline
											className='border-0'
											onClick={() => setStateDelete(false)}>
											Cancel
										</Button>
									</CardFooterLeft>
									<CardFooterRight>
										<Button
											icon={deleteLoading ? null : 'Delete'}
											color='danger'
											onClick={() => {
												setDeleteLoading(true);
												deleteItem(itemId);
											}}>
											{deleteLoading && <Spinner isSmall inButton />}
											{deleteLoading ? 'Deleting' : 'Yes, Delete!'}
										</Button>
									</CardFooterRight>
								</CardFooter>
							</Card>
						</div>
					</div>
				</ModalBody>
				{/* <ModalFooter /> */}
			</Modal>
			<Modal
				isOpen={stateEdit}
				setIsOpen={setStateEdit}
				titleId='EditVoucher'
				isStaticBackdrop={staticBackdropStatusEdit}
				isScrollable={scrollableStatusEdit}
				isCentered={centeredStatusEdit}
				size='xl'
				fullScreen={fullScreenStatusEdit}
				isAnimation={animationStatusEdit}>
				<ModalHeader setIsOpen={headerCloseStatusEdit ? setStateEdit : null}>
					<ModalTitle id='editVoucher'>
						{' '}
						<CardHeader>
							<CardLabel icon='Edit' iconColor='info'>
								<CardTitle>Editing Purchase Order</CardTitle>
								<small> Item Id: {itemId}</small>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							{editingItemLoading ? (
								<div className='d-flex justify-content-center'>
									<Spinner color='primary' size='5rem' />
								</div>
							) : (
								<Edit editingItem={editingItem} handleStateEdit={handleStateEdit} />
							)}
							<CardFooter>
								<CardFooterRight>
									<Button
										color='info'
										icon='cancel'
										isOutline
										className='border-0'
										onClick={() => setStateEdit(false)}>
										Cancel
									</Button>
								</CardFooterRight>
							</CardFooter>
						</div>
					</div>
				</ModalBody>
				{/* <ModalFooter /> */}
			</Modal>
			{/* Recieved Modal */}
			<Modal
				isOpen={stateRecieve}
				setIsOpen={setStateReceive}
				titleId='ReceivedPurchaseOrder'
				size='xl'
				isAnimation={animationStatusEdit}
				isStaticBackdrop={staticBackdropStatusEdit}
				isScrollable={scrollableStatusEdit}
				isCentered={centeredStatusEdit}>
				<ModalHeader setIsOpen={headerCloseStatusEdit ? setStateReceive : null}>
					<ModalTitle id='ReceivedPurchaseOrder'>
						{' '}
						<CardHeader>
							<CardLabel icon='Edit' iconColor='info'>
								<CardTitle>Receive Order {poNo}</CardTitle>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							{recievedItemLoading ? (
								<div className='d-flex justify-content-center'>
									<Spinner color='primary' size='5rem' />
								</div>
							) : (
								<Received
									recievedItem={recievedItem}
									handleStateRecieved={handleStateRecieved}
								/>
							)}
							<CardFooter>
								<CardFooterLeft>
									<Button
										color='info'
										icon='cancel'
										isOutline
										className='border-0'
										onClick={() => setStateReceive(false)}>
										Cancel
									</Button>
								</CardFooterLeft>
							</CardFooter>
						</div>
					</div>
				</ModalBody>
				<ModalFooter />
			</Modal>

			{/* Return Modal */}
			<Modal
				isOpen={stateReturn}
				setIsOpen={setStateReturn}
				titleId='ReceivedPurchaseOrder'
				size='xl'>
				<ModalHeader setIsOpen={headerCloseStatusReturn ? setStateReturn : null}>
					<ModalTitle id='ReturnPurchaseOrder'>
						{' '}
						<CardHeader>
							<CardLabel icon='Edit' iconColor='info'>
								<CardTitle>Return Order {poNo}</CardTitle>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							{returnItemsLoading ? (
								<div className='d-flex justify-content-center'>
									<Spinner color='primary' size='5rem' />
								</div>
							) : (
								<ReturnOrder
									returnData={returnData}
									handleStateReturn={handleStateReturn}
								/>
							)}
							<CardFooter>
								<CardFooterLeft>
									<Button
										color='info'
										icon='cancel'
										isOutline
										className='border-0'
										onClick={() => setStateReturn(false)}>
										Cancel
									</Button>
								</CardFooterLeft>
							</CardFooter>
						</div>
					</div>
				</ModalBody>
				<ModalFooter />
			</Modal>
		</>
	);
};
View.propTypes = {
	tableDataLoading: PropTypes.bool.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	tableData: PropTypes.array.isRequired,
	refreshTableData: PropTypes.func.isRequired,
};

export default View;
