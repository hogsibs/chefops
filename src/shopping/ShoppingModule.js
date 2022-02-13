import { useCallback, useState } from "react";
import { connect } from "react-redux";
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
      <ShoppingList
        items={items}
        onChangeIsChecked={useCallback(
          (changingItem, isChecked) =>
            setItems(
              items.map((item) =>
                changingItem === item ? { ...changingItem, isChecked } : item
              )
            ),
          [items]
        )}
      />
    </>
  );
};
export default ShoppingModule;
