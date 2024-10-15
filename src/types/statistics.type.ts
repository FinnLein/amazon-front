import { TCategory } from "./category.type"

export type TStatisticsResponse = {
	name: string
	value: number
}[]

export type TStatisticsProducts = {
	productId: number | string
	name: string
	slug: string
	productPrice: number
	totalQuantitySold: number
	totalPriceSold: number
}[]
export type TPriceProducts = {
	name: string
	price: number
	category: TCategory
}[]
export type TUsersRegistration = {
	month: string
	year: number
	count: number
}[]
