import { TProduct } from './product.type'

export type TCartItem = {
	id: number
	product: TProduct
	quantity: number
	price: number
}
