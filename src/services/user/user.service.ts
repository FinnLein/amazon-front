import { IUserFormState } from '@/ui/fields/user-form/user-form.types'

import { getUsersUrl } from '@/config/configUrl'

import {
	IPaginationParams,
	IPaginationResponse
} from '@/types/pagination.interface'
import { IFullUser, IUser } from '@/types/user.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { instance } from '@/api/api.interceptor'

export const UserService = {
	async getProfile() {
		return instance<IFullUser>({
			url: getUsersUrl('profile'),
			method: ENUM_HTTP_METHODS.GET
		})
	},

	async updateProfile(data: IUserFormState) {
		return instance<IUser>({
			url: getUsersUrl('profile'),
			method: ENUM_HTTP_METHODS.PUT,
			data
		})
	},

	async updateProfileAvatar(data: IUserFormState) {
		return instance<IUser>({
			url: getUsersUrl('profile-avatar'),
			method: ENUM_HTTP_METHODS.PATCH,
			data
		})
	},

	async toggleFavorite(productId: string | number) {
		return instance<IUser>({
			url: getUsersUrl(`profile/favorites/${productId}`),
			method: ENUM_HTTP_METHODS.PATCH
		})
	},

	async getAll(queryData = {} as IPaginationParams) {
		const { data } = await instance<IPaginationResponse<IUser>>({
			url: getUsersUrl(''),
			method: ENUM_HTTP_METHODS.GET,
			params: queryData
		})

		return data
	},

	// admin

	async byId(id: string) {
		return instance<IUser>({
			url: getUsersUrl(id),
			method: ENUM_HTTP_METHODS.GET
		})
	},

	async create(createUserDto: IUserFormState) {
		return instance<IUser>({
			url: getUsersUrl(``),
			method: ENUM_HTTP_METHODS.POST,
			data: createUserDto
		})
	},
	async update(id: string | number, createUserDto: IUserFormState) {
		return instance<IUser>({
			url: getUsersUrl(`${id}`),
			method: ENUM_HTTP_METHODS.PUT,
			data: createUserDto
		})
	},
	async delete(id: string | number) {
		return instance<void>({
			url: getUsersUrl(`${id}`),
			method: ENUM_HTTP_METHODS.DELETE
		})
	}
}
