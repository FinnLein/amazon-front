import { IUser } from './user.interface'

export interface IReview {
	id: number
	user: Pick<IUser, 'avatarPath' | 'name' | 'id' | 'email'>
	createdAt: string
	text: string
	rating: number
}
