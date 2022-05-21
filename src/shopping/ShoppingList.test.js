import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  mapDispatchToProps,
  mapStateToProps,
  ShoppingList,
} from "./ShoppingList";
import styles from "./ShoppingList.module.css";
import { changeItemIsChecked } from "./shoppingCartReducer";

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

  test("when a checkbox is checked, the onChangeIsChecked callback is invoked", async () => {
    const handleChangeIsChecked = jest.fn();
    const whippedCream = { name: "whipped cream" };
    render(
      <ShoppingList
        items={[whippedCream]}
        onChangeIsChecked={handleChangeIsChecked}
      />
    );

    await userEvent.click(screen.getByLabelText("whipped cream"));

    expect(handleChangeIsChecked).toHaveBeenCalledWith(
      expect.toBe(whippedCream),
      true
    );
  });

  test("checked items are styled in strikethrough", () => {
    render(<ShoppingList items={[{ name: "potatoes", isChecked: true }]} />);

    expect(
      screen.getByRole(
        (role, element) =>
          role === "listitem" && element.textContent === "potatoes"
      )
    ).toHaveClass(styles["item--checked"]);
  });
});

describe("mapStateToProps", () => {
  test("maps shopping cart to items", () => {
    const shoppingCart = [{ name: "hot dog buns", isChecked: true }];
    const props = mapStateToProps({ shoppingCart });

    expect(props).toHaveProperty("items", expect.toBe(shoppingCart));
  });
});

describe("mapDispatchToProps", () => {
  test("binds changeItemIsChecked action to onChangeIsChecked", () => {
    const dispatch = jest.fn();
    const { onChangeIsChecked } = mapDispatchToProps(dispatch);

    const cabbage = { name: "cabbage" };
    onChangeIsChecked(cabbage, true);

    expect(dispatch).toHaveBeenCalledWith(
      changeItemIsChecked({ item: cabbage, isChecked: true })
    );
  });
});
