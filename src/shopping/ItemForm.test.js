import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ItemForm, mapDispatchToProps } from "./ItemForm";
import { addItem } from "./shoppingCartReducer";

describe("ItemForm", () => {
  const getForm = () => screen.getByRole("form");
  const getItemNameInput = () => screen.getByLabelText("Item Name");
  const getAddItemButton = () => screen.getByText("Add Item");

  test("renders a form", () => {
    render(<ItemForm />);

    expect(getForm()).toBeInTheDocument();
  });

  test('renders an "Item Name" input', () => {
    render(<ItemForm />);

    expect(getItemNameInput()).toBeInTheDocument();
  });

  test('"Item Name" input value is controlled', async () => {
    render(<ItemForm />);

    await userEvent.type(getItemNameInput(), "garlic");

    expect(getItemNameInput()).toHaveValue("garlic");
  });

  test('renders an "Add Item" button', () => {
    render(<ItemForm />);

    expect(getAddItemButton()).toBeInTheDocument();
  });

  describe("when a user submits a valid form", () => {
    const submitValidForm = async () => {
      await userEvent.type(getItemNameInput(), "onions");
      await userEvent.click(getAddItemButton());
    };

    test("the onSubmit handler is called with form values", async () => {
      const handleSubmit = jest.fn();
      render(<ItemForm onSubmit={handleSubmit} />);

      await submitValidForm();

      expect(handleSubmit).toHaveBeenCalledWith({ name: "onions" });
    });

    test("Item Name is cleared", async () => {
      render(<ItemForm onSubmit={() => {}} />);

      await submitValidForm();

      expect(getItemNameInput()).not.toHaveValue();
    });

    describe("global submit event", () => {
      const handleSubmitGlobal = jest.fn();
      afterEach(() => handleSubmitGlobal.mockRestore());

      beforeAll(() => {
        window.addEventListener("submit", handleSubmitGlobal);
      });
      afterAll(() => {
        window.removeEventListener("submit", handleSubmitGlobal);
      });

      test("default is prevented", async () => {
        render(<ItemForm onSubmit={() => {}} />);

        await submitValidForm();

        expect(handleSubmitGlobal).toHaveBeenCalledWith(
          expect.toHaveProperty("defaultPrevented", true)
        );
      });
    });
  });
});

describe("mapDispatchToProps", () => {
  test("binds addItem action to onSubmit", () => {
    const dispatch = jest.fn();
    const { onSubmit } = mapDispatchToProps(dispatch);

    onSubmit({ name: "ginger" });

    expect(dispatch).toHaveBeenCalledWith(addItem({ name: "ginger" }));
  });
});
