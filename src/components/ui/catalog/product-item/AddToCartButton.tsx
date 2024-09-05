import { useCart } from '@/hooks/useCart';
import { useCartStore } from '@/store/cart/cartStore';
import { TProduct } from '@/types/product.type';
import { FC } from 'react';
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";

const AddToCartButton: FC<{ product: TProduct }> = ({ product }) => {
	const { addToCart, removeFromCart } = useCartStore(state => state)
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	const handleAddToCart = () => {
		const cartItem = {
		  id: product.id, 
		  product: product,
		  quantity: 1,
		  price: product.price
		};
	
		addToCart(cartItem, cartItem.quantity, cartItem.price);
	  };

	return (
		<div>
			<button className="text-secondary"
				onClick={() =>
					currentElement
						? removeFromCart(currentElement.id)
						: handleAddToCart()
				}
			>
				{currentElement ? <RiShoppingCart2Fill  /> : <RiShoppingCart2Line  />}
			</button>
		</div>
	)
}

export default AddToCartButton
