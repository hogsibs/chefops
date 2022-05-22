import classNames from "classnames";
import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useId,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeItemIsChecked, ShoppingItem } from "./shopping-cart-reducer";
import { Dispatch, State } from "../store";
import styles from "./ShoppingList.module.css";

const ShoppingList: FunctionComponent = () => {
  const items = useSelector((state: State) => state.shoppingCart);
  return (
    <>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <ShoppingListItem key={index} item={item} />
          ))}
        </ul>
      ) : (
        "There are no items in the shopping list."
      )}
    </>
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
        onChange={useCallback<ChangeEventHandler<HTMLInputElement>>(
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

export default ShoppingList;
