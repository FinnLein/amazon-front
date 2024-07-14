import { getContentType } from '@/api/api.helper'
import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
	IAuthResponse,
	IEmailPassword
} from './../../store/user/user.interface'
import { saveToStorage } from './auth.helper'
import { instance } from '@/api/api.interceptor'

export const AuthService = {
	async main(
		type: AuthorizationType.login | AuthorizationType.register,
		data: IEmailPassword
	) {
		const response = await instance<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refresh-token')

		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + '/auth/login/access-token',
			{ refreshToken },
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}

export default AuthService
