import { TOrder } from './order.type'
import { TProduct } from './product.type'

export enum UserRole {
	User = 'USER',
	Admin = 'ADMIN'
}

export interface TUser {
	id: number
	email: string
	name: string
	avatarPath: string
	phone: string
	role: UserRole
}

export interface TFullUser extends TUser {
	favorites: TProduct[]
	orders: TOrder[]
}

export interface IAuthFormData extends Pick<TUser, 'email' | 'phone' | 'name'> {
	password: string
}
