import { axiosClassic, instance } from '@/api/api.interceptor'
import { getProductsUrl } from '@/config/configUrl'
import { TProduct, TypePaginationProduct } from '@/types/product.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'
import { DataFilters, TProductData } from './product.interface'

export const ProductService = {
	async getAll(queryData = {} as DataFilters) {
		const { data } = await axiosClassic<TypePaginationProduct>({
			url: getProductsUrl(''),
			method: EnumHTTPMethods.get,
			params: queryData
		})

		return data
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

	async create() {
		return instance<TProduct>({
			url: getProductsUrl(''),
			method: EnumHTTPMethods.post
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
