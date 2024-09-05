import cn from 'clsx'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

import Button from '@/ui/button/Button'
import SquareButton from '@/ui/button/SquareButton'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'

import { convertPrice } from '@/utils/convertPrice'

import { useCartStore } from '@/store/cart/cartStore'
import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'

const HeaderCart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { total } = useCart()
	const items = useCartStore(state => state.items)

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
					<Button variant='white' size='sm' className='btn-link mt-5 mb-2'>
						Place order
					</Button>
				</div>
			</div>
		</div>
	)
}

export default HeaderCart
