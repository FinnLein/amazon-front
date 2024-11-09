import { getProductsUrl } from '@/config/configUrl'

import { IPaginationResponse } from '@/types/pagination.interface'
import { IProduct, IProductData } from '@/types/product.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { axiosClassic, instance } from '@/api/api.interceptor'

import { IProductDataFilters } from './product.types'

export const ProductService = {
	async getAll(queryData = {} as IProductDataFilters) {
		const { data } = await axiosClassic<IPaginationResponse<IProduct>>({
			url: getProductsUrl(''),
			method: ENUM_HTTP_METHODS.GET,
			params: queryData
		})
		return data
	},
	async getSimilar(id: string | number) {
		return axiosClassic<IProduct[]>({
			url: getProductsUrl(`similar/${id}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getBySlug(slug: string) {
		const { data } = await axiosClassic<IProduct>({
			url: getProductsUrl(`by-slug/${slug}`),
			method: ENUM_HTTP_METHODS.GET
		})

		return data
	},
	async getByCategory(categorySlug: string) {
		return axiosClassic<IProduct[]>({
			url: getProductsUrl(`by-category/${categorySlug}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},

	async getById(id: string | number) {
		return instance<IProduct>({
			url: getProductsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.GET
		})
	},

	async create(data: IProductData) {
		return instance<IProduct>({
			url: getProductsUrl(''),
			method: ENUM_HTTP_METHODS.POST,
			data
		})
	},

	async update(id: string | number, data: IProductData) {
		return instance<IProduct>({
			url: getProductsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.PUT,
			data
		})
	},
	async delete(id: string | number) {
		return instance<IProduct>({
			url: getProductsUrl(`${id}`),
			method: ENUM_HTTP_METHODS.DELETE
		})
	}
}
