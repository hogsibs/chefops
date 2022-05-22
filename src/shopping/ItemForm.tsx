import { useCallback, useState } from "react";
import { connect } from "react-redux";
import { addItem } from "./shoppingCartReducer.ts";

const ItemForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  return (
    <form
      aria-label="Item Form"
      onSubmit={useCallback(
        (event) => {
          onSubmit({ name });
          setName("");
          event.preventDefault();
        },
        [name, onSubmit, setName]
      )}
    >
      <input
        aria-label="Item Name"
        name="name"
        onChange={useCallback(
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

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(ItemForm);
