import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { original } from "immer";

export interface ShoppingItem {
  name: string;
  isChecked?: boolean;
}

type ShoppingCartState = ShoppingItem[];

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: [] as ShoppingCartState,
  reducers: {
    addItem(state, { payload: newItem }: PayloadAction<ShoppingItem>) {
      state.push(newItem);
    },
    changeItemIsChecked(
      state,
      {
        payload: { item, isChecked },
      }: PayloadAction<{ item: ShoppingItem; isChecked: boolean }>
    ) {
      const stateItem = state.find((itemDraft) => original(itemDraft) === item);
      if (!stateItem) {
        throw new Error(`shopping item ${item.name} does not exist`);
      }
      stateItem.isChecked = isChecked;
    },
  },
});

export const name = shoppingCartSlice.name;
export const { addItem, changeItemIsChecked } = shoppingCartSlice.actions;
export const reducer = shoppingCartSlice.reducer;
export const selectShoppingCart = (state: { [name]: ShoppingCartState }) =>
  state[name];
