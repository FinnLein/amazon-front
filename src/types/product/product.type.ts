import { TCategory } from '../category/category.type'
import { TReview } from '../review/review.type'

export type TProduct = {
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

export type TProductDetails = {
	product: TProduct
}
