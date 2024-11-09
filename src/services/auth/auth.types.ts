import { UserRole } from '@/types/user.interface'

export interface ITokenInside {
	id: number
	rights: UserRole[]
	iat: number
	exp: number
}

export type TProtectedUser = Omit<ITokenInside, 'iat' | 'exp'>
