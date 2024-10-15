import { instance } from '@/api/api.interceptor'
import { getStatisticsUrl } from '@/config/configUrl'
import {
	TPriceProducts,
	TStatisticsProducts,
	TStatisticsResponse,
	TUsersRegistration
} from '@/types/statistics.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

export const StatisticsService = {
	async getMain() {
		return instance<TStatisticsResponse>({
			url: getStatisticsUrl('main'),
			method: EnumHTTPMethods.get
		})
	},
	async getBestSellingProduct() {
		return instance<TStatisticsProducts>({
			url: getStatisticsUrl('best-selling-products'),
			method: EnumHTTPMethods.get
		})
	},
	async getMostUnsoldProduct() {
		return instance<TStatisticsProducts>({
			url: getStatisticsUrl('most-unsold-products'),
			method: EnumHTTPMethods.get
		})
	},
	async getMostExpensiveProducts() {
		return instance<TPriceProducts>({
			url: getStatisticsUrl('most-expensive-products'),
			method: EnumHTTPMethods.get
		})
	},
	async getMostExpensiveProductsByCategory() {
		return instance<TPriceProducts>({
			url: getStatisticsUrl('most-expensive-products/by-category'),
			method: EnumHTTPMethods.get
		})
	},
	async getMostChippiesProducts() {
		return instance<TPriceProducts>({
			url: getStatisticsUrl('most-chippiest-products'),
			method: EnumHTTPMethods.get
		})
	},
	async getUsersCount() {
		return instance<TStatisticsResponse>({
			url: getStatisticsUrl('users-count'),
			method: EnumHTTPMethods.get
		})
	},
	async getUsersRegistrationByMonths() {
		return instance<TUsersRegistration>({
			url: getStatisticsUrl('registration-by-month'),
			method: EnumHTTPMethods.get
		})
	},
}
