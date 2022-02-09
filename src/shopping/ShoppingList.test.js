import { render, screen, within } from "@testing-library/react";
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

    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toEqual([
      expect.toHaveTextContent("seaweed"),
      expect.toHaveTextContent("bananas"),
    ]);
  });

  test("renders a checkbox for each item", () => {
    render(<ShoppingList items={[{ name: "watermelon" }]} />);

    const element = screen.queryByLabelText("watermelon");
    expect(element).toBe("input");
    expect(element).toHaveAttribute("type", "checkbox");
  });
});
