import { TUser } from '@/types/user.type'

export interface IAuthResponse {
	accessToken: string
	user: TUser
}
