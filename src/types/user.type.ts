import { TOrder } from "./order.type"
import { TProduct } from "./product.type"

export type TUser = {
	id: number
	email: string
	name: string
	avatarPath: string
	phone: string
}

export type TFullUser = {
	favorites: TProduct[]
	orders: TOrder[]
}
