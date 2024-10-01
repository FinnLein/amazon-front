import { instance } from '@/api/api.interceptor'
import { IUserFormState } from '@/app/admin/users/(form)/user-form.types'
import { getUsersUrl } from '@/config/configUrl'
import { TFullUser, TUser } from '@/types/user.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'
import { IPaginationParams, IPaginationResponse } from '@/types/pagination.type'

export const UserService = {
	async getProfile() {
		return instance<TFullUser>({
			url: getUsersUrl('profile'),
			method: EnumHTTPMethods.get
		})
	},

	async updateProfile(data: TUser) {
		return instance<TUser>({
			url: getUsersUrl('profile'),
			method: EnumHTTPMethods.put,
			data
		})
	},

	async toggleFavorite(productId: string | number) {
		return instance<TUser>({
			url: getUsersUrl(`profile/favorites/${productId}`),
			method: EnumHTTPMethods.patch
		})
	},

	async getAll(params?: IPaginationParams) {
		return instance<IPaginationResponse<TUser>>({
			url: getUsersUrl(''),
			method: EnumHTTPMethods.get,
			params
		})
	},

	// admin

	async byId(id: string | number) {
		return instance<TUser>({
			url: getUsersUrl(`${id}`),
			method: EnumHTTPMethods.get
		})
	},

	async create(createUserDto: IUserFormState) {
		return instance<TUser>({
			url: getUsersUrl(``),
			method: EnumHTTPMethods.post,
			data: createUserDto
		})
	},
	async update(id: string | number, createUserDto: IUserFormState) {
		return instance<TUser>({
			url: getUsersUrl(`${id}`),
			method: EnumHTTPMethods.put,
			data: createUserDto
		})
	},
	async delete(id: string | number) {
		return instance<void>({
			url: getUsersUrl(`${id}`),
			method: EnumHTTPMethods.delete
		})
	}
}
