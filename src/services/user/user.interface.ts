import { UserRole } from '@/types/user.interface'

export interface IUser {
	email: string
	password?: string
	role?: UserRole
	name?: string
	avatarPath?: string
	phone?: string
}
