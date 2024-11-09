import { IUser } from '@/types/user.interface'

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
