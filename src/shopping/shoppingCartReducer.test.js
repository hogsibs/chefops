import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer, {
  addItem,
  changeItemIsChecked,
} from "./shoppingCartReducer";

describe("shoppingCartReducer", () => {
  const createMockStore = (initialState) =>
    configureStore({
      reducer: shoppingCartReducer,
      preloadedState: initialState,
    });

  test("initial state is an empty collection", () => {
    const store = createMockStore();

    expect(store.getState()).toEqual([]);
  });

  test("addItem adds an item to the collection", () => {
    const store = createMockStore();

    const milk = { name: "milk" };
    store.dispatch(addItem(milk));

    expect(store.getState()).toEqual([expect.toBe(milk)]);
  });

  [true, false].forEach((isChecked) =>
    test(`checked changes get tracked in items (isChecked = ${isChecked})`, () => {
      const peanutButter = { name: "peanut butter" };
      const store = createMockStore([peanutButter]);

      store.dispatch(changeItemIsChecked({ item: peanutButter, isChecked }));

      expect(store.getState()).toEqual([{ name: "peanut butter", isChecked }]);
    })
  );
});
