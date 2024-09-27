import { TCartItem } from './cart.type'
import { TUser } from './user.type'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export type TOrder = {
	id: number
	createdAt: string
	items: TCartItem[]
	status: EnumOrderStatus
	user: TUser
	total: number
}
