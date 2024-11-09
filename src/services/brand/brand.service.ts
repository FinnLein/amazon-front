import { getBrandsUrl } from '@/config/configUrl'

import { IBrand, IBrandData } from '@/types/brand.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { axiosClassic, instance } from '@/api/api.interceptor'

export const BrandService = {
	async getAll(searchTerm?: string) {
		const { data } = await axiosClassic<IBrand[]>({
			url: getBrandsUrl(''),
			method: ENUM_HTTP_METHODS.GET,
			params: searchTerm
		})

		return data
	},
	async getById(id: string) {
		return instance<IBrand>({
			url: getBrandsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic<IBrand>({
			url: getBrandsUrl(`by-slug/${slug}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async create(data: IBrandData) {
		return instance<IBrand>({
			url: getBrandsUrl(''),
			method: ENUM_HTTP_METHODS.POST,
			data
		})
	},
	async update(id: string | number, data: IBrandData) {
		return instance<IBrand>({
			url: getBrandsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.PUT,
			data
		})
	},
	async delete(id: string | number) {
		return instance<IBrand>({
			url: getBrandsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.DELETE
		})
	}
}
