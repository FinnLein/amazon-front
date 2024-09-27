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
	id: number | string
	images: string[]
	name: string
	slug: string
	price: number
}[]
export type TUsersRegistration = {
	month: string
	year: number
	count: number
}[]
