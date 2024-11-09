import { UserRole } from '@/types/user.interface'

import { TProtectedUser } from '@/services/auth/auth.types'

export interface IUserDataState {
	id: number
	rights: UserRole[]
	isLoggedIn: boolean
	isAdmin: boolean
	isManager: boolean
	isPremium: boolean
}

export const transformUserToState = (
	user: TProtectedUser
): IUserDataState | null => {
	return {
		...user,
		isLoggedIn: true,
		isAdmin: user.rights.includes(UserRole.ADMIN),
		isManager: user.rights.includes(UserRole.MANAGER),
		isPremium: user.rights.includes(UserRole.PREMIUM)
	}
}
