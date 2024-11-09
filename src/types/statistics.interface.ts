import { ICategory } from './category.interface'

export interface IUsersStatisticsResponse {
	name: string
	value: number
}

export interface IProductsStatisticsResponse {
	name: string
	value: number
}

export interface IStatisticsProducts {
	productId: number | string
	name: string
	slug: string
	productPrice: number
	totalQuantitySold: number
	totalPriceSold: number
}
export interface IPriceProducts {
	name: string
	price: number
	category: ICategory
}
export interface IUsersRegistration {
	month: string
	year: number
	count: number
}
