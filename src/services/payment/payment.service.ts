import { instance } from '@/api/api.interceptor'
import { getPaymentUrl } from '@/config/configUrl'
import { TPaymentResponse } from '@/types/payment.type'

export const PaymentService = {
	async createPayment(amount: number) {
		return instance.post<TPaymentResponse>(getPaymentUrl(''), {
			amount
		})
	}
}
