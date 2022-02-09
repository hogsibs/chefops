import { useCallback, useState } from "react";
import ItemForm from "./ItemForm";
import ShoppingList from "./ShoppingList";

const ShoppingModule = () => {
  const [items, setItems] = useState([]);
  const addItem = useCallback(
    (newItem) => setItems([...items, newItem]),
    [items]
  );
  return (
    <>
      <ItemForm onSubmit={addItem} />
      <ShoppingList items={items} />
    </>
  );
};
export default ShoppingModule;
