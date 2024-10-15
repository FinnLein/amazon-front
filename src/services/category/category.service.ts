import { getCategoriesUrl } from '@/config/configUrl'

import { ICategoryData, TCategory } from '@/types/category.type'
import { IPaginationParams, IPaginationResponse } from '@/types/pagination.type'

import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

import { axiosClassic, instance } from '@/api/api.interceptor'

export const CategoryService = {
	async getAll(params?: IPaginationParams) {
		return axiosClassic<IPaginationResponse<TCategory>>({
			url: getCategoriesUrl(''),
			method: EnumHTTPMethods.get,
			params
		})
	},
	async getById(id: string ) {
		return instance<TCategory>({
			url: getCategoriesUrl(`${id}`),
			method: EnumHTTPMethods.get
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic<TCategory>({
			url: getCategoriesUrl(`by-slug/${slug}`),
			method: EnumHTTPMethods.get
		})
	},
	async create(data: ICategoryData) {
		return instance<TCategory>({
			url: getCategoriesUrl(''),
			method: EnumHTTPMethods.post,
			data
		})
	},
	async update(id: string | number, data: ICategoryData) {
		return instance<TCategory>({
			url: getCategoriesUrl(`${id}`),
			method: EnumHTTPMethods.put,
			data
		})
	},
	async delete(id: string | number) {
		return instance<TCategory>({
			url: getCategoriesUrl(`${id}`),
			method: EnumHTTPMethods.delete
		})
	}
}
