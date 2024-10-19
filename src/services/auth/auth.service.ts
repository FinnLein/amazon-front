import { getAuthUrl } from '@/config/configUrl'

import { IAuthFormData } from '@/types/user.type'

import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'
import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'

import { axiosClassic } from '@/api/api.interceptor'

import { IAuthResponse } from './../../store/user/user.interface'
import { removeFromStorage, saveTokenStorage } from './auth.helper'

export const AuthService = {
	async main(
		type: AuthorizationType.login | AuthorizationType.register,
		data: IAuthFormData,
		token?: string | null
	) {
		const response = await axiosClassic<IAuthResponse>({
			url: getAuthUrl(`${type}`),
			method: EnumHTTPMethods.post,
			data,
			headers: {
				recaptcha: token
			}
		})

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response.data
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl(`access-token`)
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async getNewTokensByRefreshToken(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl(`access-token`),
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)

		return response.data
	},

	async logout() {
		const response = await axiosClassic.post<boolean>(getAuthUrl(`logout`))

		if (response.data) removeFromStorage()

		return response
	}
}
