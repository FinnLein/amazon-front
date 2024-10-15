import { getProductsUrl } from '@/config/configUrl'

import {
	IPaginationParamsWithSort,
	IPaginationResponse
} from '@/types/pagination.type'
import { TProduct, TProductData } from '@/types/product.type'

import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

import { axiosClassic, instance } from '@/api/api.interceptor'

export const ProductService = {
	async getAll(params?: IPaginationParamsWithSort) {
		return axiosClassic<IPaginationResponse<TProduct>>({
			url: getProductsUrl(''),
			method: EnumHTTPMethods.get,
			params
		})
	},
	async getSimilar(id: string | number) {
		return axiosClassic<TProduct[]>({
			url: getProductsUrl(`similar/${id}`),
			method: EnumHTTPMethods.get
		})
	},
	async getBySlug(slug: string) {
		return axiosClassic<TProduct>({
			url: getProductsUrl(`by-slug/${slug}`),
			method: EnumHTTPMethods.get
		})
	},
	async getByCategory(categorySlug: string) {
		return axiosClassic<TProduct[]>({
			url: getProductsUrl(`by-category/${categorySlug}`),
			method: EnumHTTPMethods.get
		})
	},

	async getById(id: string | number) {
		return instance<TProduct>({
			url: getProductsUrl(`${id}`),
			method: EnumHTTPMethods.get
		})
	},

	async create(data: TProductData) {
		return instance<TProduct>({
			url: getProductsUrl('/'),
			method: EnumHTTPMethods.post,
			data
		})
	},

	async update(id: string | number, data: TProductData) {
		return instance<TProduct>({
			url: getProductsUrl(`${id}`),
			method: EnumHTTPMethods.put,
			data
		})
	},
	async delete(id: string | number) {
		return instance<TProduct>({
			url: getProductsUrl(`${id}`),
			method: EnumHTTPMethods.delete
		})
	}
}
