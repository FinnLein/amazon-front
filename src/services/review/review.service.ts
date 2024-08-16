import { axiosClassic, instance } from '@/api/api.interceptor'
import { getReviewsUrl } from '@/config/configUrl'
import { TReview } from '@/types/review.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'
import { IReview } from './review.interface'

export const ReviewService = {
	async getAll() {
		return axiosClassic<TReview[]>({
			url: getReviewsUrl(''),
			method: EnumHTTPMethods.get
		})
	},

	async create(productId: string | number, data: IReview) {
		return instance<TReview[]>({
			url: getReviewsUrl(`leave/${productId}`),
			method: EnumHTTPMethods.post,
			data
		})
	},

	async getAverageByProduct(productId: string | number) {
		return axiosClassic<number>({
			url: getReviewsUrl(`average-by-product/${productId}`),
			method: EnumHTTPMethods.get
		})
	}
}
