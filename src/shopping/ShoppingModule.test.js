import { render, screen } from "@testing-library/react";
import ItemForm from "./ItemForm";
import ShoppingList from "./ShoppingList";
import ShoppingModule from "./ShoppingModule";

jest.mock("./ItemForm").mock("./ShoppingList");
afterEach(() => jest.restoreAllMocks());

describe("ShoppingModule", () => {
  beforeEach(() => {
    ItemForm.mockReturnValue(null);
    ShoppingList.mockReturnValue(null);
  });

  test("renders an ItemForm", () => {
    ItemForm.mockReturnValue(<div data-testid="ItemForm" />);

    render(<ShoppingModule />);

    expect(screen.getByTestId("ItemForm")).toBeInTheDocument();
  });

  test("renders a ShoppingList", () => {
    ShoppingList.mockReturnValue(<div data-testid="ShoppingList" />);

    render(<ShoppingModule />);

    expect(screen.getByTestId("ShoppingList")).toBeInTheDocument();
  });
});
