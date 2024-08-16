import { instance } from '@/api/api.interceptor'
import { getUsersUrl } from '@/config/configUrl'
import { TFullUser, TUser } from '@/types/user.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

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
	}
}
