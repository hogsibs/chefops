import { render } from "@testing-library/react";
import ItemForm from "./ItemForm";

describe("ItemForm", () => {
  test("renders a form", () => {
    const { queryByRole } = render(<ItemForm />);
    expect(queryByRole("form")).not.toBeNull();
  });
});
