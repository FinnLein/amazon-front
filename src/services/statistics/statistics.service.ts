import { getStatisticsUrl } from '@/config/configUrl'

import {
	IPriceProducts,
	IStatisticsProducts,
	IUsersRegistration,
	IUsersStatisticsResponse
} from '@/types/statistics.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { instance } from '@/api/api.interceptor'

export const StatisticsService = {
	async getMain() {
		return instance<IUsersStatisticsResponse[]>({
			url: getStatisticsUrl('main'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getBestSellingProduct() {
		return instance<IStatisticsProducts>({
			url: getStatisticsUrl('best-selling-products'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getMostUnsoldProduct() {
		return instance<IStatisticsProducts>({
			url: getStatisticsUrl('most-unsold-products'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getMostExpensiveProducts() {
		return instance<IPriceProducts[]>({
			url: getStatisticsUrl('most-expensive-products'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getMostExpensiveProductsByCategory() {
		return instance<IPriceProducts[]>({
			url: getStatisticsUrl('most-expensive-products/by-category'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getMostChippiesProducts() {
		return instance<IPriceProducts>({
			url: getStatisticsUrl('most-chippiest-products'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getUsersCount() {
		return instance<IUsersStatisticsResponse>({
			url: getStatisticsUrl('users-count'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getProductsCount() {
		return instance<IUsersStatisticsResponse>({
			url: getStatisticsUrl('products-count'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getUsersRegistrationByMonths() {
		return instance<IUsersRegistration>({
			url: getStatisticsUrl('registration-by-month'),
			method: ENUM_HTTP_METHODS.GET
		})
	}
}
