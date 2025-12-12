import { IBrand } from './brand.interface'
import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IProduct {
	id: number
	name: string
	slug: string
	description: string
	price: number
	reviews: IReview[]
	images: string[]
	createdAt: string
	category: ICategory
	brand: IBrand
}

export interface IProductData
	extends Omit<IProduct, 'id' | 'reviews' | 'createdAt'> {}

