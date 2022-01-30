import { createEvent, fireEvent, render } from "@testing-library/react";
import ItemForm from "./ItemForm";

describe("ItemForm", () => {
  /** @type {import("@testing-library/react").RenderResult} */
  let itemForm;
  const handleSubmit = jest.fn();
  beforeEach(() => (itemForm = render(<ItemForm onSubmit={handleSubmit} />)));
  afterEach(() => jest.resetAllMocks());

  test("renders a form", () =>
    expect(itemForm.queryByRole("form")).not.toBeNull());

  describe("when the form is submitted", () => {
    beforeEach(() => fireEvent.submit(itemForm.getByRole("form")));
    test("the onSubmit handler is called", () =>
      expect(handleSubmit).toHaveBeenCalled());
  });
});
