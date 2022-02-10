import { useCallback } from "react";

/**
 * @param {Object} props
 * @param {[]} props.items
 * @returns {import("react").ReactElement}
 */
export default function ShoppingList({ items, onChangeIsChecked }) {
  return items.length ? (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <label>
            <ItemCheckbox item={item} onChange={onChangeIsChecked} />
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  ) : (
    "There are no items in the shopping list."
  );
}

const ItemCheckbox = ({ item, onChange }) => (
  <input
    type="checkbox"
    checked={Boolean(item.isChecked)}
    onChange={useCallback(
      (event) => onChange(item, event.target.checked),
      [item, onChange]
    )}
  />
);
