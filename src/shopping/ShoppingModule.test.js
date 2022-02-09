import { render, screen } from "@testing-library/react";
import ItemForm from "./ItemForm";
import ShoppingModule from "./ShoppingModule";

jest.mock("./ItemForm");
afterEach(() => jest.restoreAllMocks());

describe("ShoppingModule", () => {
  test("renders an ItemForm", () => {
    ItemForm.mockReturnValue(<div data-testid="ItemForm" />);

    render(<ShoppingModule />);

    expect(screen.getByTestId("ItemForm")).toBeInTheDocument();
  });
});
