import { instance } from '@/api/api.interceptor'
import { getReviewsUrl } from '@/config/configUrl'
import { TReview } from '@/types/review.type'
import { HTTPMethods } from '@/utils/enums/HTTPMethods'
import { IReview } from './review.interface'

export const ReviewService = {
	async getAll() {
		return instance<TReview[]>({
			url: getReviewsUrl(),
			method: HTTPMethods.get
		})
	},

	async create(productId: string | number, data: IReview) {
		return instance<TReview[]>({
			url: `${getReviewsUrl()}/leave/${productId}`,
			method: HTTPMethods.post,
			data
		})
	}
}
