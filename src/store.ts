import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartReducer } from "./shopping";

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  },
});
export default store;
export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
