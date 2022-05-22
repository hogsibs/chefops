import {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "../store";
import { addItem } from "./shoppingCartReducer";

const ItemForm: FunctionComponent = () => {
  const dispatch = useDispatch<Dispatch>();
  const [name, setName] = useState("");
  return (
    <form
      aria-label="Item Form"
      onSubmit={useCallback<FormEventHandler>(
        (event) => {
          dispatch(addItem({ name }));
          setName("");
          event.preventDefault();
        },
        [dispatch, name]
      )}
    >
      <input
        aria-label="Item Name"
        name="name"
        onChange={useCallback<ChangeEventHandler<HTMLInputElement>>(
          ({ target: { value } }) => setName(value),
          [setName]
        )}
        type="text"
        value={name}
      />
      <button>Add Item</button>
    </form>
  );
};

export default ItemForm;
