import classNames from "classnames";
import { FunctionComponent, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeItemIsChecked,
  selectShoppingCart,
  ShoppingItem,
} from "./shopping-cart-state";
import { Dispatch } from "../store";
import styles from "./shopping-list.module.css";

const ShoppingList: FunctionComponent = () => {
  const items = useSelector(selectShoppingCart);
  return items.length > 0 ? (
    <ul>
      {items.map((item) => (
        <ShoppingListItem key={item.name} item={item} />
      ))}
    </ul>
  ) : (
    <span>There are no items in the shopping list.</span>
  );
};

interface ShoppingListItemProperties {
  item: ShoppingItem;
}
const ShoppingListItem: FunctionComponent<ShoppingListItemProperties> = ({
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
        onChange={(event) =>
          dispatch(
            changeItemIsChecked({ item, isChecked: event.target.checked })
          )
        }
      />
      <label htmlFor={checkboxId}>{item.name}</label>
    </li>
  );
};

export default ShoppingList;
