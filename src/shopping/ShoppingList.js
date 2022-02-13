import classNames from "classnames";
import { useCallback } from "react";
import styles from "./ShoppingList.module.css";

/**
 * @param {Object} props
 * @param {[]} props.items
 * @returns {import("react").ReactElement}
 */
export default function ShoppingList({ items, onChangeIsChecked }) {
  return items.length ? (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames({
            [styles["item--checked"]]: item.isChecked,
          })}
        >
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
