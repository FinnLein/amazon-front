import { TCategory } from './category.type'
import { TReview } from './review.type'

export interface TProduct {
	id: number
	name: string
	slug: string
	description: string
	price: number
	reviews: TReview[]
	images: string[]
	createdAt: string
	category: TCategory
}

export interface TProductData
	extends Omit<TProduct, 'id' | 'reviews' | 'createdAt'> {}

export type TProductDetails = {
	product: TProduct
}

export type TypeProducts = {
	products: TProduct[]
}
