import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { original } from "immer";

export interface ShoppingItem {
  name: string;
  isChecked?: boolean;
}

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: [] as ShoppingItem[],
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

export const { addItem, changeItemIsChecked } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
