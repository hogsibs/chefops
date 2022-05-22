import classNames from "classnames";
import { FunctionComponent, useCallback, useId } from "react";
import { connect, useDispatch } from "react-redux";
import { changeItemIsChecked, ShoppingItem } from "./shoppingCartReducer.ts";
import { Dispatch, State } from "../store.ts";
import styles from "./ShoppingList.module.css";

export const ShoppingList: FunctionComponent<any> = ({ items }) => {
  return (
    <>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <ShoppingListItem item={item} />
          ))}
        </ul>
      ) : (
        "There are no items in the shopping list."
      )}
    </>
  );
};

interface ShoppingListItemProps {
  item: ShoppingItem;
}
const ShoppingListItem: FunctionComponent<ShoppingListItemProps> = ({
  item,
}) => {
  const checkboxId = useId();
  const dispatch = useDispatch<Dispatch>();

  return (
    <li
      className={classNames({
        [styles["item--checked"]]: item.isChecked,
      })}
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={Boolean(item.isChecked)}
        onChange={useCallback(
          (event) =>
            dispatch(
              changeItemIsChecked({ item, isChecked: event.target.checked })
            ),
          [dispatch, item]
        )}
      />
      <label htmlFor={checkboxId}>{item.name}</label>
    </li>
  );
};

export const mapStateToProps = (state: State) => ({
  items: state.shoppingCart,
});

export default connect(mapStateToProps)(ShoppingList);
