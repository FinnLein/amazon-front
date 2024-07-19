import { IAuthResponse, ITokens } from '@/store/user/user.interface'
import { Tokens } from '@/utils/enums/tokens.enums'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	const accessToken = Cookies.get(Tokens.accessToken)
	return accessToken || null
}
export const getRefreshToken = () => {
	const refreshToken = Cookies.get(Tokens.refreshToken)
	return refreshToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const setTokensStorage = (data: ITokens) => {
	Cookies.set(Tokens.accessToken, data.accessToken)
	Cookies.set(Tokens.refreshToken, data.refreshToken)
}
export const removeFromStorage = () => {
	Cookies.remove(Tokens.accessToken)
	Cookies.remove(Tokens.refreshToken)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	setTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
