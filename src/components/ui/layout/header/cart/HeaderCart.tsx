'use client'

import cn from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import Link from 'next/link'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

import SquareButton from '@/ui/button/SquareButton'

import '@/assets/styles/globals.scss'

import { useCartStore } from '@/store/cart/cartStore'

import { useCart } from '@/hooks/useCart'
import { useOrders } from '@/hooks/useOrders'
import { useOutside } from '@/hooks/useOutside'

import { xSlideAnimations } from '@/utils/animations.ts/animations.data'
import { convertPrice } from '@/utils/convertPrice'

import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'

const HeaderCart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { total } = useCart()
	const { items } = useCartStore(state => state)

	const { mutate } = useOrders()

	return (
		<div className='relative z-40' ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => setIsShow(!isShow)}
				number={items.length}
			/>
			<AnimatePresence>
				{isShow && (
					<m.div
						variants={xSlideAnimations}
						initial='initial'
						animate='animate'
						transition={{ ease: 'easeInOut', duration: 0.5 }}
						exit={{ x: 400, opacity: 0 }}
						className={cn(
							'absolute overflow-scroll h-96 top-[4.2rem] -left-[12.5rem] w-80 bg-secondary rounded-xl px-5 py-3 text-sm z-20 menu text-white',
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
						<div className='text-center mt-7 mb-5'>
							<Link className='btn btn-white' href={'/checkout'}>
								Go to checkout
							</Link>
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default HeaderCart
