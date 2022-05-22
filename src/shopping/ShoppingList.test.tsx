import { render, screen, within } from "../test-utils.tsx";
import userEvent from "@testing-library/user-event";
import ShoppingList from "./ShoppingList.tsx";
import styles from "./ShoppingList.module.css";

test("when given an empty list, displays a message indicating there are no items", () => {
  render(<ShoppingList />, { preloadedState: { shoppingCart: [] } });

  expect(
    screen.getByText("There are no items in the shopping list.")
  ).toBeInTheDocument();
});

test("renders each item in a list", () => {
  render(<ShoppingList />, {
    preloadedState: {
      shoppingCart: [{ name: "seaweed" }, { name: "bananas" }],
    },
  });

  expect(within(screen.getByRole("list")).getAllByRole("listitem")).toEqual([
    expect.toHaveTextContent("seaweed"),
    expect.toHaveTextContent("bananas"),
  ]);
});

test("renders a checkbox for each item", () => {
  render(<ShoppingList />, {
    preloadedState: { shoppingCart: [{ name: "watermelon" }] },
  });

  const element = screen.getByLabelText("watermelon");
  expect(element).toBeInstanceOf(HTMLInputElement);
  expect(element).toHaveAttribute("type", "checkbox");
});

test("checked items reflect their states", () => {
  render(<ShoppingList />, {
    preloadedState: {
      shoppingCart: [
        { name: "milk", isChecked: true },
        { name: "cookies", isChecked: false },
        { name: "carrots" },
      ],
    },
  });

  expect(screen.getByLabelText("milk")).toBeChecked();
  expect(screen.getByLabelText("cookies")).not.toBeChecked();
  expect(screen.getByLabelText("carrots")).not.toBeChecked();
});

test("when a checkbox is checked, the onChangeIsChecked callback is invoked", async () => {
  const { store } = render(<ShoppingList />, {
    preloadedState: { shoppingCart: [{ name: "whipped cream" }] },
  });

  await userEvent.click(screen.getByLabelText("whipped cream"));

  expect(store.getState().shoppingCart).toEqual([
    { name: "whipped cream", isChecked: true },
  ]);
});

test("checked items are styled in strikethrough", () => {
  render(<ShoppingList />, {
    preloadedState: { shoppingCart: [{ name: "potatoes", isChecked: true }] },
  });

  expect(
    screen
      .getAllByRole("listitem")
      .find((item) => item.textContent === "potatoes")
  ).toHaveClass(styles["item--checked"]);
});
