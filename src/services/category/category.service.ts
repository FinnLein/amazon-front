import { axiosClassic, instance } from '@/api/api.interceptor'
import { getCategoriesUrl } from '@/config/configUrl'
import { TCategory } from '@/types/category.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

export const CategoryService = {
	async getAll() {
		return axiosClassic<TCategory[]>({
			url: getCategoriesUrl(''),
			method: EnumHTTPMethods.get
		})
	},
	async getById(id: string | number) {
		return instance<TCategory[]>({
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
	async create() {
		return instance<TCategory[]>({
			url: getCategoriesUrl(''),
			method: EnumHTTPMethods.post
		})
	},
	async update(id: string | number, name: string) {
		return instance<TCategory[]>({
			url: getCategoriesUrl(`${id}`),
			method: EnumHTTPMethods.put,
			data: { name }
		})
	},
	async delete(id: string | number) {
		return instance<TCategory[]>({
			url: getCategoriesUrl(`${id}`),
			method: EnumHTTPMethods.delete
		})
	}
}
