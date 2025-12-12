import { getCategoriesUrl } from '@/config/configUrl'

import { ICategory, ICategoryData } from '@/types/category.interface'
import { IPaginationParams } from '@/types/pagination.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { axiosClassic, instance } from '@/api/api.interceptor'

export const CategoryService = {
	async getAll(queryParams = {} as IPaginationParams) {
		const { data } = await axiosClassic<ICategory[]>({
			url: getCategoriesUrl(''),
			method: ENUM_HTTP_METHODS.GET,
			params: queryParams
		})

		return data
	},
	async getById(id: string) {
		return instance<ICategory>({
			url: getCategoriesUrl(`${id}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic<ICategory>({
			url: getCategoriesUrl(`by-slug/${slug}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async create(data: ICategoryData) {
		return instance<ICategory>({
			url: getCategoriesUrl(''),
			method: ENUM_HTTP_METHODS.POST,
			data
		})
	},
	async update(id: string | number, data: ICategoryData) {
		return instance<ICategory>({
			url: getCategoriesUrl(`${id}`),
			method: ENUM_HTTP_METHODS.PUT,
			data
		})
	},
	async delete(id: string | number) {
		return instance<ICategory>({
			url: getCategoriesUrl(`${id}`),
			method: ENUM_HTTP_METHODS.DELETE
		})
	}
}
