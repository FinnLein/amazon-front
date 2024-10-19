import Cookies from 'js-cookie'

import { Tokens } from '@/utils/enums/tokens.enums'

export const getAccessToken = () => {
	const accessToken = Cookies.get(Tokens.accessToken)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(Tokens.accessToken, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
}
export const removeFromStorage = () => {
	Cookies.remove(Tokens.accessToken)
	localStorage.removeItem('user')
}
