'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import Heading from '@/ui/Heading'
import Button from '@/ui/button/Button'
import { ProductItem } from '@/ui/catalog/product-item/ProductItem'

import { useCartStore } from '@/store/cart/cartStore'

import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import styles from './Checkout.module.scss'
import { CheckoutItem } from './CheckoutItem'
import { OrderService } from '@/services/order/order.service'

export function Checkout({ products = [] }: { products: IProduct[] }) {
	const { items, total } = useCart()

	const { reset } = useCartStore()

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['payment'],
		mutationFn: () =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.id
				}))
			}),
		onSuccess({ data }) {
			reset()
			push(data.confirmation.confirmation_url)
		}
	})

	return (
		<>
			{items.length ? (
				<section className={styles.checkout}>
					<div>
						<Heading className='mb-6'>Checkout</Heading>
						<div className={styles.list}>
							{items.map(item => (
								<CheckoutItem product={item.product} key={item.id} />
							))}
						</div>
						<div className={styles.footer}>
							<div className={styles.total}>
								<div>Total cost</div>
								<div>{convertPrice(total)}</div>
							</div>
							<Button
								variant='white'
								size={'lg'}
								className='mt-5 mb-2'
								onClick={() => mutate()}
							>
								Place order
							</Button>
						</div>
					</div>
					<div>
						<Heading className='mb-6 text-2xl'>Recommended products</Heading>
						<div className={styles.recommended}>
							{products
								.filter(
									product =>
										!items.map(item => item.product.id).includes(product.id)
								)
								.slice(0, 2)
								.map(product => (
									<ProductItem product={product} />
								))}
						</div>
					</div>
				</section>
			) : (
				<section></section>
			)}
		</>
	)
}
