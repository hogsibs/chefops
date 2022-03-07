import classNames from "classnames";
import { useCallback } from "react";
import { connect } from "react-redux";
import { changeItemIsChecked } from "./shoppingCartReducer";
import styles from "./ShoppingList.module.css";

/**
 * @param {Object} props
 * @param {[]} props.items
 * @returns {import("react").ReactElement}
 */
export function ShoppingList({ items, onChangeIsChecked }) {
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

export const mapStateToProps = (state) => ({ items: state.shoppingCart });
export const mapDispatchToProps = (dispatch) => ({
  onChangeIsChecked: (item, isChecked) =>
    dispatch(changeItemIsChecked({ item, isChecked })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);

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
