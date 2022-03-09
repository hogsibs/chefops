import { configureStore } from "@reduxjs/toolkit";
import { shoppingCartReducer } from "./shopping";

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
  }
});
export default store;
