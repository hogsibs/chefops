import {FunctionComponent} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from '../store';
import {
	addItem,
	selectShoppingCart,
	ShoppingCartState,
} from './shopping-cart-state';
import {object, string} from 'yup';
import {InputField} from '../forms';

const validationSchema = object({
	name: string()
		.default('')
		.when((_, schema, options) =>
			schema.notOneOf(
				(options.context as ShoppingCartState).map(item => item.name),
				'An item with this name is already in your shopping list',
			),
		),
});

const ItemForm: FunctionComponent = () => {
	const dispatch = useDispatch<Dispatch>();
	const shoppingCart = useSelector(selectShoppingCart);
	const {reset, handleSubmit, control} = useForm({
		context: shoppingCart,
		resolver: yupResolver(validationSchema),
		defaultValues: validationSchema.cast({}, {context: shoppingCart}),
	});

	return (
		<form
			aria-label='Item Form'
			onSubmit={handleSubmit(({name}) => {
				dispatch(addItem({name}));
				reset();
			})}
		>
			<InputField control={control} name='name' aria-label='Item Name'/>
			<button type='submit'>Add Item</button>
		</form>
	);
};

export default ItemForm;
