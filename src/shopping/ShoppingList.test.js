import { render, screen } from "@testing-library/react";
import ShoppingList from "./ShoppingList";

describe("ShoppingList", () => {
  test("when given an empty list, displays a message indicating there are no items", () => {
    render(<ShoppingList items={[]} />);
    const noItemsMessage = screen.queryByText(
      "There are no items in the shopping list."
    );
    expect(noItemsMessage).not.toBeNull();
  });
});
