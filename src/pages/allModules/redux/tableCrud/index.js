// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';

export const addProjectSlice = createSlice({
	name: 'tableCrud',
	initialState: {
		data: {
			items: {
				unit: 10,
			},
		},
		cookies: {
			userRights: [],
			branchName: 'null',
		},
	},
	reducers: {
		increment: (state) => {
			state.data.items.unit += 5;
		},
		updateSingleState: (state, action) => {
			return {
				...state,
				data: {
					...state.data,
					[action.payload[1]]: {
						...state.data[action.payload[1]],
						[action.payload[2]]: {
							...state.data[action.payload[1]][action.payload[2]],
							[action.payload[3]]: action.payload[0],
						},
					},
				},
			};
		},
		// updateCookies: (state, action) => {
		// 	return {
		// 		...state,
		// 		cookies: {
		// 			...state.cookies,
		// 			[action.payload[1]]: action.payload[0],
		// 		},
		// 	};
		// },
		// // eslint-disable-next-line no-unused-vars
		// resetStore: (state, action) => {
		// 	return {
		// 		data: {
		// 			inventory: {
		// 				items: {
		// 					tableData: null,
		// 					tableDataLoading: false,
		// 					pageNo: 1,
		// 					perPage: 10,
		// 				},
		// 			},
		// 		},
		// 		cookies: {
		// 			userRights: [],
		// 			branchName: 'null',
		// 		},
		// 	};
		// },
	},
});

export const {
	// updateWholeObject, updateSingleState, resetStore, updateCookies,
	// updateSingleState,
	increment,
} = addProjectSlice.actions;
export default addProjectSlice.reducer;
