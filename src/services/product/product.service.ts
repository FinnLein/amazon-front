import { instance } from '@/api/api.interceptor'
import { getProductsUrl } from '@/config/configUrl'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'
import { DataFilters, IProduct } from './product.interface'

export const ProductService = {
	async getAll(queryData = {} as DataFilters) {
		return instance<IProduct[]>({
			url: getProductsUrl(),
			method: EnumHTTPMethods.get,
			params: queryData
		})
	},
	async getSimilar(id: string | number) {
		return instance<IProduct[]>({
			url: `${getProductsUrl()}/similar/${id}`,
			method: EnumHTTPMethods.get
		})
	},
	async getBySlug(slug: string) {
		return instance<IProduct>({
			url: `${getProductsUrl()}/by-slug/${slug}`,
			method: EnumHTTPMethods.get
		})
	},
	async getByCategory(categorySlug: string) {
		return instance<IProduct[]>({
			url: `${getProductsUrl()}/by-category/${categorySlug}`,
			method: EnumHTTPMethods.get
		})
	},

	async getById(id: string | number) {
		return instance<IProduct>({
			url: `${getProductsUrl()}/${id}`,
			method: EnumHTTPMethods.get
		})
	},

	async create() {
		return instance<IProduct>({
			url: getProductsUrl(),
			method: EnumHTTPMethods.post
		})
	},

	async update(id: string | number, data: IProduct) {
		return instance<IProduct>({
			url: `${getProductsUrl()}/${id}`,
			method: EnumHTTPMethods.put,
			data
		})
	},
	async delete(id: string | number) {
		return instance<IProduct>({
			url: `${getProductsUrl()}/${id}`,
			method: EnumHTTPMethods.delete
		})
	}
}
