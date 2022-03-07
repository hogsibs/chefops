import { render, screen } from "@testing-library/react";
import ItemForm from "./ItemForm";
import ShoppingList from "./ShoppingList";
import ShoppingModule from "./ShoppingModule";

jest
  .mock("./ItemForm", () => ({ __esModule: true, default: jest.fn() }))
  .mock("./ShoppingList", () => ({ __esModule: true, default: jest.fn() }));
afterEach(() => jest.restoreAllMocks());

describe("ShoppingModule", () => {
  beforeEach(() => {
    ItemForm.mockReturnValue(<div data-testid="ItemForm" />);
    ShoppingList.mockReturnValue(<div data-testid="ShoppingList" />);
  });

  test("renders an ItemForm", () => {
    render(<ShoppingModule />);

    expect(screen.getByTestId("ItemForm")).toBeInTheDocument();
  });

  test("renders a ShoppingList", () => {
    render(<ShoppingModule />);

    expect(screen.getByTestId("ShoppingList")).toBeInTheDocument();
  });
});
