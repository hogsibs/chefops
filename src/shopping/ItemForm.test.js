import { fireEvent, render } from "@testing-library/react";
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

  describe("when the form is submitted", () => {
    beforeEach(() => fireEvent.submit(itemForm.getByRole("form")));
    test("the onSubmit handler is called", () =>
      expect(handleSubmit).toHaveBeenCalled());
  });
});
