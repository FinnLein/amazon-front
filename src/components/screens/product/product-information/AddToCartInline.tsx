import Button from '@/ui/button/Button'

import { useCartStore } from '@/store/cart/cartStore'

import { IProduct } from '@/types/product.interface'

export function AddToCartInline({ product }: { product: IProduct }) {
	const { addToCart, removeFromCart, items } = useCartStore()

	const currentElement = items.find(i => i.product.id === product.id)

	return (
		<div className='mt-5'>
			<Button
				variant='orange'
				onClick={() =>
					currentElement
						? removeFromCart(currentElement.id)
						: addToCart({
								id: product.id,
								product,
								quantity: 1,
								price: product.price
							})
				}
			>
				{currentElement ? 'Remove from cart' : 'Add to cart'}
			</Button>
		</div>
	)
}
