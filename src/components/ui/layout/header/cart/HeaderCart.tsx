'use client'

import cn from 'clsx'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

import Button from '@/ui/button/Button'
import SquareButton from '@/ui/button/SquareButton'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'

import { convertPrice } from '@/utils/convertPrice'

import { OrderService } from '@/services/order/order.service'
import { useCartStore } from '@/store/cart/cartStore'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'

const HeaderCart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { total } = useCart()
	const { items, reset } = useCartStore(state => state)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['create order and payment'],
		mutationFn: () =>
			OrderService.place({
				items: items.map(item => ({
					quantity: item.quantity,
					price: item.price,
					productId: item.product.id
				}))
			}),
		onSuccess({ data }) {
			push(data.confirmation.confirmation_url)
		}
	})

	return (
		<div className='relative z-40' ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => setIsShow(!isShow)}
				number={items.length}
			/>

			<div
				className={cn(
					'absolute top-[4.2rem] -left-[12.5rem] w-80 bg-secondary rounded-xl px-5 py-3 text-sm z-20 menu text-white',
					isShow ? 'open-menu' : 'close-menu'
				)}
			>
				<div className='font-normal text-lg mb-5'>My Cart</div>

				<div className={styles.cart}>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className='font-light'>Cart is empty!</div>
					)}
				</div>
				<div className={styles.footer}>
					<div>Total:</div>
					<div>{convertPrice(total)}</div>
				</div>
				<div className='text-center'>
					<Button
						variant='white'
						size='sm'
						className='btn-link mt-5 mb-2'
						onClick={() => mutate()}
					>
						Place order
					</Button>
				</div>
			</div>
		</div>
	)
}

export default HeaderCart
