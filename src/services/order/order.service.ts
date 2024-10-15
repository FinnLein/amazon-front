import { instance } from '@/api/api.interceptor'
import { getOrdersUrl } from '@/config/configUrl'
import { EnumOrderStatus, TOrder } from '@/types/order.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

type TData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: number
	}[]
}

export const OrderService = {
	async getAll() {
		return instance<TOrder[]>({
			url: getOrdersUrl(''),
			method: EnumHTTPMethods.get
		})
	},
	async getRecently() {
		return instance<TOrder[]>({
			url: getOrdersUrl('get-last'),
			method: EnumHTTPMethods.get
		})
	},
	async place(data: TData) {
		return instance<{ confirmation: { confirmation_url: string } }>({
			url: getOrdersUrl(''),
			method: EnumHTTPMethods.post,
			data
		})
	}
}
