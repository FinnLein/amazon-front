import { TProduct } from './product.type'

export type TCart = {
	id: number
	product: TProduct
	quantity: number
	price: number
}
