import { getPaymentUrl } from '@/config/configUrl'

import { IPaymentResponse } from '@/types/payment.interface'

import { instance } from '@/api/api.interceptor'

export const PaymentService = {
	async createPayment(amount: number) {
		return instance.post<IPaymentResponse>(getPaymentUrl(''), {
			amount
		})
	}
}
