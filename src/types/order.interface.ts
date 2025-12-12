import { ICartItem } from './cart.interface'

export enum ENUM_ORDER_STATUS {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export interface IOrder {
	id: number
	createdAt: string
	items: ICartItem[]
	status: ENUM_ORDER_STATUS
	total: number
	userId: number
}
