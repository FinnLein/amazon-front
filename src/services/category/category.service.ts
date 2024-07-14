import { instance } from '@/api/api.interceptor'
import { getCategoriesUrl } from '@/config/configUrl'
import { TCategory } from '@/types/category.type'
import { HTTPMethods } from '@/utils/enums/HTTPMethods'

export const CategoryService = {
	async getAll() {
		return instance<TCategory[]>({
			url: getCategoriesUrl(),
			method: HTTPMethods.get
		})
	},
	async getById(id: string | number) {
		return instance<TCategory[]>({
			url: `${getCategoriesUrl()}/${id}`,
			method: HTTPMethods.get
		})
	},
	async getBySlug(slug: string) {
		return instance<TCategory[]>({
			url: `${getCategoriesUrl()}/by-slug/${slug}`,
			method: HTTPMethods.get
		})
	},
	async create() {
		return instance<TCategory[]>({
			url: getCategoriesUrl(),
			method: HTTPMethods.post
		})
	},
	async update(id: string | number, name: string) {
		return instance<TCategory[]>({
			url: `${getCategoriesUrl()}/${id}`,
			method: HTTPMethods.put,
			data: { name }
		})
	},
	async delete(id: string | number) {
		return instance<TCategory[]>({
			url: `${getCategoriesUrl()}/${id}`,
			method: HTTPMethods.delete
		})
	}
}
