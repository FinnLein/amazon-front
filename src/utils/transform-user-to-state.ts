import { IProtectedUser } from '@/services/auth/auth.types'
import { UserRole } from '@/types/user.type'

export interface IUserDataState {
	id: number
	role: UserRole
	isLoggedIn: boolean
	isAdmin: boolean
}

export const transformUserToState = (
	user: IProtectedUser
): IUserDataState | null => {
	return {
		...user,
		isAdmin: user.role === UserRole.Admin,
		isLoggedIn: true
	}
}
