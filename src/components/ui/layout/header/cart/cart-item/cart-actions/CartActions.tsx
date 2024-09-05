import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/store/cart/cartStore'
import { TCartItem } from '@/types/cart.type'
import { FC } from 'react'
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi'

const CartActions: FC<{ item: TCartItem }> = ({ item }) => {
	const { removeFromCart, changeQuantity } = useCartStore(state => state)

	const { items } = useCart()

	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity

	return (
		<div className='mt-3'>
			<div className='flex items-center gap-3'>
				<button
					onClick={() => changeQuantity(item.id, 'minus')}
					disabled={quantity === 1}
					aria-label='Уменьшить'
				>
					<FiMinus fontSize={13} />
				</button>
				<input
					disabled
					readOnly
					value={quantity}
					className='w-10 bg-black text-center'
					placeholder='.'
				/>
				<button
					onClick={() => changeQuantity(item.id, 'plus')}
					aria-label='Добавить'
				>
					<FiPlus fontSize={13} />
				</button>
				<button
					aria-label='Убрать из корзины'
					onClick={() => removeFromCart(item.id)}
					className='text-white ml-3'
				>
					<FiTrash fontSize={13} />
				</button>
			</div>
		</div>
	)
}

export default CartActions
