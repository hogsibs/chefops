import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {original} from 'immer';

export interface ShoppingItem {
	name: string;
	isChecked?: boolean;
}

export type ShoppingCartState = ShoppingItem[];

const shoppingCartSlice = createSlice({
	name: 'shoppingCart',
	initialState: [] as ShoppingCartState,
	reducers: {
		addItem(state, {payload: newItem}: PayloadAction<ShoppingItem>) {
			state.push(newItem);
		},
		changeItemIsChecked(
			state,
			{
				payload: {item, isChecked},
			}: PayloadAction<{item: ShoppingItem; isChecked: boolean}>,
		) {
			const stateItem = state.find(itemDraft => original(itemDraft) === item);
			if (!stateItem) {
				throw new Error(`shopping item ${item.name} does not exist`);
			}

			stateItem.isChecked = isChecked;
		},
	},
});

export const {name} = shoppingCartSlice;
export const {
	actions: {addItem, changeItemIsChecked},
} = shoppingCartSlice;
export const {reducer} = shoppingCartSlice;
export const selectShoppingCart = (state: {[name]: ShoppingCartState}) =>
	state[name];
