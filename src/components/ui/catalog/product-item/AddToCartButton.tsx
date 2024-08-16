import { useActions } from '@/hooks/useActions';
import { useCart } from '@/hooks/useCart';
import { TProduct } from '@/types/product.type';
import { FC } from 'react';
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";

const AddToCartButton: FC<{ product: TProduct }> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<div>
			<button className="text-secondary"
				onClick={() =>
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({ product, quantity: 1, price: product.price })
				}
			>
				{currentElement ? <RiShoppingCart2Fill  /> : <RiShoppingCart2Line  />}
			</button>
		</div>
	)
}

export default AddToCartButton
