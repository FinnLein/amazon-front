import { axiosClassic } from '@/api/api.interceptor'
import { getAuthUrl } from '@/config/configUrl'
import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'
import { Tokens } from '@/utils/enums/tokens.enums'
import Cookies from 'js-cookie'
import {
	IAuthResponse,
	IEmailPassword
} from './../../store/user/user.interface'
import { saveToStorage } from './auth.helper'

export const AuthService = {
	async main(
		type: AuthorizationType.login | AuthorizationType.register,
		data: IEmailPassword
	) {
		const response = await axiosClassic<IAuthResponse>({
			url: getAuthUrl(`${type}`),
			method: EnumHTTPMethods.post,
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(Tokens.refreshToken)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			getAuthUrl(`login/access-token`),
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}
