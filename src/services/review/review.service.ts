import { getReviewsUrl } from '@/config/configUrl'

import {
	IPaginationParamsWithSort,
	IPaginationResponse
} from '@/types/pagination.interface'
import { IReview } from '@/types/review.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { axiosClassic, instance } from '@/api/api.interceptor'

import { IReviewFields } from '@/screens/product/product-reviews.tsx/review-fields.interface'

export const ReviewService = {
	async getAll(
		queryParams = {} as Omit<IPaginationParamsWithSort, 'searchTerm'>
	) {
		const { data } = await axiosClassic<IPaginationResponse<IReview>>({
			url: getReviewsUrl(''),
			method: ENUM_HTTP_METHODS.GET,
			params: queryParams
		})

		return data
	},

	async create(productId: string | number, data: IReviewFields) {
		return instance<IReview[]>({
			url: getReviewsUrl(`leave/${productId}`),
			method: ENUM_HTTP_METHODS.POST,
			data
		})
	},

	async getAverageByProduct(id: string | number) {
		return axiosClassic<number>({
			url: getReviewsUrl(`average-by-product/${id}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},

	//Admin
	async delete(id: string | number) {
		return instance<IReview>({
			url: getReviewsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.DELETE
		})
	},
	async getById(id: string | number) {
		debugger
		const { data } = await instance<IReview>({
			url: getReviewsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.GET
		})

		return data
	}
}
