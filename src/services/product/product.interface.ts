
import { TProduct } from '@/types/product.type'

export interface TProductData {
	name: string
	price: number
	description?: string
	image: string[]
	categoryId: number
}


export type TypeProducts = {
	products: TProduct[]
}
