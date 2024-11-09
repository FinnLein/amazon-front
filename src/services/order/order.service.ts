import { getOrdersUrl } from '@/config/configUrl'

import { ENUM_ORDER_STATUS, IOrder } from '@/types/order.interface'

import { ENUM_HTTP_METHODS } from '@/utils/enums/HTTPMethods'

import { instance } from '@/api/api.interceptor'

type TData = {
	status?: ENUM_ORDER_STATUS
	items: {
		quantity: number
		price: number
		productId: number
	}[]
}

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: getOrdersUrl(''),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async getRecently() {
		return instance<IOrder[]>({
			url: getOrdersUrl('get-last'),
			method: ENUM_HTTP_METHODS.GET
		})
	},
	async place(data: TData) {
		return instance<{ confirmation: { confirmation_url: string } }>({
			url: getOrdersUrl(''),
			method: ENUM_HTTP_METHODS.POST,
			data
		})
	}
}
