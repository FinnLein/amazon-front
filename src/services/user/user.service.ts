import { instance } from '@/api/api.interceptor'
import { getUsersUrl } from '@/config/configUrl'
import { TUser } from '@/types/user.type'
import { HTTPMethods } from '@/utils/enums/HTTPMethods'
import { IUser } from './user.interface'

export const UserService = {
	async getProfile() {
		return instance<TUser>({
			url: `${getUsersUrl}/profile`,
			method: HTTPMethods.get
		})
	},

	async updateProfile(data: IUser) {
		return instance<TUser>({
			url: `${getUsersUrl}/profile`,
			method: HTTPMethods.put,
			data
		})
	},

	async toggleFavorite(productId: string | number) {
		return instance<TUser>({
			url: `${getUsersUrl}/profile/favorites/${productId}`,
			method: HTTPMethods.patch
		})
	}
}
