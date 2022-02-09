import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemForm from "./ItemForm";

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

  test('"Item Name" input value is controlled', () => {
    render(<ItemForm />);

    userEvent.type(getItemNameInput(), "garlic");

    expect(getItemNameInput()).toHaveAttribute("value", "garlic");
  });

  test('renders an "Add Item" button', () => {
    render(<ItemForm />);
    
    expect(getAddItemButton()).toBeInTheDocument();
  });

  describe("when a user submits a valid form", () => {
    const submitValidForm = () => {
      userEvent.type(getItemNameInput(), "onions");
      userEvent.click(getAddItemButton());
    };

    test("the onSubmit handler is called with form values", () => {
      const handleSubmit = jest.fn();
      render(<ItemForm onSubmit={handleSubmit} />);

      submitValidForm();

      expect(handleSubmit).toHaveBeenCalledWith({ name: "onions" });
    });

    test("Item Name is cleared", () => {
      render(<ItemForm onSubmit={() => {}} />);

      submitValidForm();

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

      test("default is prevented", () => {
        render(<ItemForm onSubmit={() => {}} />);

        submitValidForm();

        expect(handleSubmitGlobal).toHaveBeenCalledWith(
          expect.toHaveProperty("defaultPrevented", true)
        );
      });
    });
  });
});
