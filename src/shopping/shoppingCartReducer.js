import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: [],
  reducers: {
    addItem(state, { payload: newItem }) {
      state.push(newItem);
    },
    changeItemIsChecked(state, { payload: { item, isChecked } }) {
      state.find((itemDraft) => original(itemDraft) === item).isChecked =
        isChecked;
    },
  },
});

export const { addItem, changeItemIsChecked } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
