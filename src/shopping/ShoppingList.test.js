import { render, screen } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

describe("ShoppingList", () => {
  test("when given an empty list, displays a message indicating there are no items", () => {
    render(<ShoppingList items={[]} />);

    expect(
      screen.getByText("There are no items in the shopping list.")
    ).toBeInTheDocument();
  });

  test("renders each item in a list", () => {
    render(<ShoppingList items={[{ name: "seaweed" }, { name: "bananas" }]} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("seaweed")).toBeInTheDocument();
    expect(screen.getByText("bananas")).toBeInTheDocument();
  });
});
