import { instance } from '@/api/api.interceptor'
import { getOrdersUrl } from '@/config/configUrl'
import { TOrder } from '@/types/order.type'
import { EnumHTTPMethods } from '@/utils/enums/HTTPMethods'

export const OrderService = {
	async getAll() {
		return instance<TOrder[]>({
			url: getOrdersUrl(''),
			method: EnumHTTPMethods.get
		})
	}
}
