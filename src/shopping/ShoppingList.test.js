import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    const element = screen.getByLabelText("watermelon");
    expect(element).toBeInstanceOf(HTMLInputElement);
    expect(element).toHaveAttribute("type", "checkbox");
  });

  test("checked items reflect their states", () => {
    render(
      <ShoppingList
        items={[
          { name: "milk", isChecked: true },
          { name: "cookies", isChecked: false },
          { name: "carrots" },
        ]}
      />
    );

    expect(screen.getByLabelText("milk")).toBeChecked();
    expect(screen.getByLabelText("cookies")).not.toBeChecked();
    expect(screen.getByLabelText("carrots")).not.toBeChecked();
  });

  test("when a checkbox is checked, the onChangeIsChecked callback is invoked", () => {
    const handleChangeIsChecked = jest.fn();
    const whippedCream = { name: "whipped cream" };
    render(
      <ShoppingList
        items={[whippedCream]}
        onChangeIsChecked={handleChangeIsChecked}
      />
    );

    userEvent.click(screen.getByLabelText("whipped cream"));

    expect(handleChangeIsChecked).toHaveBeenCalledWith(
      expect.toBe(whippedCream),
      true
    );
  });
});
