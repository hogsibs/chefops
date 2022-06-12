import { configureStore } from "@reduxjs/toolkit";
import { sliceName, shoppingCartReducer } from "./shopping";

const store = configureStore({
  reducer: {
    [sliceName]: shoppingCartReducer,
  },
});
export default store;
export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
