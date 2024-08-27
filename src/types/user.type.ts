import { TOrder } from "./order.type"
import { TProduct } from "./product.type"

export interface TUser  {
	id: number
	email: string
	name: string
	avatarPath: string
	phone: string
}

export interface TFullUser extends TUser {
	favorites: TProduct[]
	orders: TOrder[]
}
