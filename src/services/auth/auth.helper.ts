import { IAuthResponse, ITokens } from '@/store/user/user.interface'
import Cookies from 'js-cookie'

export const setTokensStorage = (data: ITokens) => {
	Cookies.remove('accessToken', data.accessToken)
	Cookies.remove('refreshToken', data.refreshToken)
}
export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse) => {
    setTokensStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}