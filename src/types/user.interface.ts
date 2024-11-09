import { IOrder } from './order.interface'
import { IProduct } from './product.interface'

export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	PREMIUM = 'PREMIUM'
}

export interface IUser {
	id: number
	email: string
	name: string
	avatarPath: string
	phone: string
	rights: UserRole[]
}

export interface IFullUser extends IUser {
	favorites: IProduct[]
	orders: IOrder[]
}

export interface IAuthFormData extends Pick<IUser, 'email' | 'phone' | 'name'> {
	password: string
}
