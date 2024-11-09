import { getReviewsUrl } from '@/config/configUrl'

import { IReview } from '@/types/review.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { axiosClassic, instance } from '@/api/api.interceptor'

export const ReviewService = {
	async getAll() {
		return axiosClassic<IReview[]>({
			url: getReviewsUrl(''),
			method: ENUM_HTTP_METHODS.GET
		})
	},

	async create(productId: string | number, data: IReview) {
		return instance<IReview[]>({
			url: getReviewsUrl(`leave/${productId}`),
			method: ENUM_HTTP_METHODS.POST,
			data
		})
	},

	async getAverageByProduct(productId: string | number) {
		return axiosClassic<number>({
			url: getReviewsUrl(`average-by-product/${productId}`),
			method: ENUM_HTTP_METHODS.GET
		})
	}
}
