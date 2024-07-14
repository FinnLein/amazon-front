import { getContentType } from '@/api/api.helper'
import { instance } from '@/api/api.interceptor'
import { getAuthUrl } from '@/config/configUrl'
import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
	IAuthResponse,
	IEmailPassword
} from './../../store/user/user.interface'
import { saveToStorage } from './auth.helper'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

export const AuthService = {
	async main(
		type: AuthorizationType.login | AuthorizationType.register,
		data: IEmailPassword
	) {
		const response = await instance<IAuthResponse>({
			url: `${getAuthUrl}/${type}`,
			method: EnumHTTPMethods.post,
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refresh-token')

		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + `${getAuthUrl}/login/access-token`,
			{ refreshToken },
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}
