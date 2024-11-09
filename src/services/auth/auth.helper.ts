import Cookies from 'js-cookie'

import { ENUM_TOKENS } from '@/utils/enums/tokens.enums'

export const getAccessToken = () => {
	const accessToken = Cookies.get(ENUM_TOKENS.accessToken)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(ENUM_TOKENS.accessToken, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
}
export const removeFromStorage = () => {
	Cookies.remove(ENUM_TOKENS.accessToken)
	localStorage.removeItem('user')
}
