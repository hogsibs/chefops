import {FunctionComponent} from 'react';
import {useForm, useController} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from '../store';
import {addItem, selectShoppingCart} from './shopping-cart-state';

interface ItemFormValues {
	name: string;
}

const ItemForm: FunctionComponent = () => {
	const dispatch = useDispatch<Dispatch>();
	const shoppingCart = useSelector(selectShoppingCart);
	const {reset, handleSubmit, control} = useForm<ItemFormValues>();
	const {field, fieldState} = useController({
		control,
		name: 'name',
		defaultValue: '',
		rules: {
			validate: name => shoppingCart.every(item => item.name !== name),
		},
	});

	return (
		<form
			aria-label='Item Form'
			onSubmit={handleSubmit(({name}) => {
				dispatch(addItem({name}));
				reset();
			})}
		>
			<input
				aria-label='Item Name'
				{...field}
				aria-invalid={Boolean(fieldState.error)}
			/>
			<button type='submit'>Add Item</button>
		</form>
	);
};

export default ItemForm;
