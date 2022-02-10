import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ItemForm from "./ItemForm";
import ShoppingList from "./ShoppingList";
import ShoppingModule from "./ShoppingModule";

jest.mock("./ItemForm").mock("./ShoppingList");
afterEach(() => jest.restoreAllMocks());

describe("ShoppingModule", () => {
  let addItem;
  beforeEach(() => {
    ItemForm.mockImplementation(({ onSubmit }) => {
      addItem = onSubmit;
      return <div data-testid="ItemForm" />;
    });
  });

  let actualItems;
  let changeIsChecked;
  beforeEach(() => {
    ShoppingList.mockImplementation(({ items, onChangeIsChecked }) => {
      actualItems = items;
      changeIsChecked = onChangeIsChecked;
      return <div data-testid="ShoppingList" />;
    });
  });

  test("renders an ItemForm", () => {
    render(<ShoppingModule />);

    expect(screen.getByTestId("ItemForm")).toBeInTheDocument();
  });

  test("renders a ShoppingList", () => {
    render(<ShoppingModule />);

    expect(screen.getByTestId("ShoppingList")).toBeInTheDocument();
  });

  test("submissions to the ItemForm get added to the ShoppingList", () => {
    render(<ShoppingModule />);

    act(() => addItem({ name: "bell peppers" }));

    expect(actualItems).toEqual([{ name: "bell peppers" }]);
  });

  test("checked changes get tracked in items", () => {
    render(<ShoppingModule />);
    const chocolateChips = { name: "chocolate chips" };
    act(() => addItem(chocolateChips));

    act(() => changeIsChecked(chocolateChips, true));

    expect(actualItems).toEqual([{ name: "chocolate chips", isChecked: true }]);
  });
});
