import { UserRole } from '@/types/user.type'

export interface ITokenInside {
	id: number
	role: UserRole
	iat: number
	exp: number
}

export interface IProtectedUser extends Omit<ITokenInside, 'iat' | 'exp'> {}
