import classNames from 'classnames';
import {
	ChangeEventHandler,
	FunctionComponent,
	useCallback,
	useId,
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	changeItemIsChecked,
	selectShoppingCart,
	ShoppingItem,
} from './shopping-cart-state';
import {Dispatch} from '../store';
import styles from './shopping-list.module.css';

const ShoppingList: FunctionComponent = () => {
	const items = useSelector(selectShoppingCart);
	return (
		items.length > 0 ? (
			<ul>
				{items.map(item => (
					// Shopping items don't have a unique id to use as a key at this time
					// eslint-disable-next-line react/jsx-key
					<ShoppingListItem item={item}/>
				))}
			</ul>
		) : (
			<span>There are no items in the shopping list.</span>
		)
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
				[styles['item--checked']]: item.isChecked,
			})}
		>
			<input
				id={checkboxId}
				type='checkbox'
				checked={Boolean(item.isChecked)}
				onChange={useCallback<ChangeEventHandler<HTMLInputElement>>(
					event =>
						dispatch(
							changeItemIsChecked({item, isChecked: event.target.checked}),
						),
					[dispatch, item],
				)}
			/>
			<label htmlFor={checkboxId}>{item.name}</label>
		</li>
	);
};

export default ShoppingList;
