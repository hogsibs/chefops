import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemForm from "./ItemForm";

describe("ItemForm", () => {
  /** @type {import("@testing-library/react").RenderResult} */
  let itemForm;
  const handleSubmit = jest.fn();
  beforeEach(() => (itemForm = render(<ItemForm onSubmit={handleSubmit} />)));
  afterEach(() => jest.resetAllMocks());

  test("renders a form", () =>
    expect(itemForm.queryByRole("form")).not.toBeNull());

  test("renders an Item Name input", () =>
    expect(itemForm.queryByLabelText("Item Name")).not.toBeNull());

  test("renders an Add Item button", () =>
    expect(itemForm.queryByText("Add Item")).not.toBeNull());

  describe('when a user types text in "Item Name"', () => {
    beforeEach(() =>
      userEvent.type(itemForm.getByLabelText("Item Name"), "garlic")
    );
    test("the input value is controlled", () =>
      expect(itemForm.getByLabelText("Item Name")).toHaveAttribute(
        "value",
        "garlic"
      ));
  });

  describe("when the user submits a valid form", () => {
    beforeEach(() => {
      userEvent.type(itemForm.getByLabelText("Item Name"), "onions");
      userEvent.click(itemForm.getByText("Add Item"));
    });
    test("the onSubmit handler is called with form values", () => {
      expect(handleSubmit).toHaveBeenCalledWith({ name: "onions" });
    });
  });
});
