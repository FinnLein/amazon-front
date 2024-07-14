import { IAuthResponse, ITokens } from '@/store/user/user.interface'
import Cookies from 'js-cookie'

export const getAccessToken = async () => {
	const accessToken = Cookies.get('accessToken')
	return accessToken || null
}

export const getUserFromStorage = async () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const setTokensStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}
export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
	setTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
