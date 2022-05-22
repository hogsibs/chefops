import { render, screen } from "../test-utils";
import userEvent from "@testing-library/user-event";
import ItemForm from "./ItemForm.tsx";

const handleSubmitGlobal = jest.fn();
afterEach(() => handleSubmitGlobal.mockRestore());

beforeAll(() => {
  window.addEventListener("submit", handleSubmitGlobal);
});
afterAll(() => {
  window.removeEventListener("submit", handleSubmitGlobal);
});

test("when the form is submimtted, the item is added to the store", async () => {
  const { store } = render(<ItemForm />);

  await userEvent.type(screen.getByLabelText("Item Name"), "onions");
  await userEvent.click(screen.getByRole("button", { name: "Add Item" }));

  expect(handleSubmitGlobal).toHaveBeenCalledWith(
    expect.objectContaining({ defaultPrevented: true })
  );
  expect(screen.getByLabelText("Item Name")).not.toHaveValue();
  expect(store.getState().shoppingCart).toEqual([{ name: "onions" }]);
});
