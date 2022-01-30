import { useCallback, useState } from "react";

const ItemForm = ({ onSubmit }) => {
  const [name, setName] = useState();
  return (
    <form aria-label="Item Form" onSubmit={onSubmit}>
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

export default ItemForm;
