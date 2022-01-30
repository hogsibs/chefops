import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemForm from "./ItemForm";

describe("ItemForm", () => {
  const handleSubmit = jest.fn();
  afterEach(() => jest.resetAllMocks());

  /** @type {HTMLFormElement} */
  let form;
  /** @type {HTMLInputElement} */
  let itemNameInput;
  /** @type {HTMLButtonElement} */
  let addItemButton;
  beforeEach(() => {
    const itemForm = render(<ItemForm onSubmit={handleSubmit} />);
    form = itemForm.queryByRole("form");
    itemNameInput = itemForm.queryByLabelText("Item Name");
    addItemButton = itemForm.queryByText("Add Item");
  });

  test("renders a form", () => expect(form).not.toBeNull());

  test("renders an Item Name input", () =>
    expect(itemNameInput).not.toBeNull());

  test("renders an Add Item button", () =>
    expect(addItemButton).not.toBeNull());

  describe('when a user types text in "Item Name"', () => {
    beforeEach(() => userEvent.type(itemNameInput, "garlic"));
    test("the input value is controlled", () =>
      expect(itemNameInput).toHaveAttribute("value", "garlic"));
  });

  describe("when a user submits a valid form", () => {
    beforeEach(() => {
      userEvent.type(itemNameInput, "onions");
      userEvent.click(addItemButton);
    });
    test("the onSubmit handler is called with form values", () => {
      expect(handleSubmit).toHaveBeenCalledWith({ name: "onions" });
    });
    test("Item Name is cleared", () => expect(itemNameInput).not.toHaveValue());
  });
});
