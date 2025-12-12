import Image from 'next/image'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import styles from './Checkout.module.scss'
import { SERVER_URL } from '@/constants/main.constants'

export function CheckoutItem({ product }: { product: IProduct }) {
	return (
		<div className={styles.item}>
			<Image
				alt={product.name}
				src={
					product.images[0].includes('http')
						? product.images[0]
						: SERVER_URL + product.images[0]
				}
				width={100}
				height={100}
			/>
			<div className={styles.row}>
				<div className={styles.information}>
					<div>{product.name}</div>
					<div>{product.category.name}</div>
				</div>
				<div className={styles.price}>{convertPrice(product.price)}</div>
			</div>
		</div>
	)
}
