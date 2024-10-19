import { UserRole } from '@/types/user.type'

export interface ITokenInside {
	id: number
	rights: UserRole[]
	iat: number
	exp: number
}

export type TProtectedUser = Omit<ITokenInside, 'iat' | 'exp'>
