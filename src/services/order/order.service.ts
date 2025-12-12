import { getOrdersUrl } from '@/config/configUrl'

import { ENUM_ORDER_STATUS, IOrder } from '@/types/order.interface'
import {
	IPaginationParams,
	IPaginationResponse
} from '@/types/pagination.interface'

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
	async getById(id: number) {
		const { data } = await instance<IOrder>({
			url: getOrdersUrl(`by-id/${id}`),
			method: ENUM_HTTP_METHODS.GET
		})

		return data
	},
	async getByCurrentUser() {
		return instance<IOrder[]>({
			url: getOrdersUrl('by-user'),
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
	},

	//admin

	async getAll(query = {} as Omit<IPaginationParams, 'searchTerm'>) {
		const { data } = await instance<IPaginationResponse<IOrder>>({
			url: getOrdersUrl(''),
			method: ENUM_HTTP_METHODS.GET,
			params: query
		})

		return data
	},
	async delete(id: number) {
		return instance<IOrder>({
			url: getOrdersUrl(`${id}`),
			method: ENUM_HTTP_METHODS.DELETE
		})
	}
}
