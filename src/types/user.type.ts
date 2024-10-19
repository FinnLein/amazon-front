import { TOrder } from './order.type'
import { TProduct } from './product.type'

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	PREMIUM = 'PREMIUM',
}

export interface TUser {
	id: number
	email: string
	name: string
	avatarPath: string
	phone: string
	rights: UserRole[]
}

export interface TFullUser extends TUser {
	favorites: TProduct[]
	orders: TOrder[]
}

export interface IAuthFormData extends Pick<TUser, 'email' | 'phone' | 'name'> {
	password: string
}
