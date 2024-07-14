type Amount = {
	value: string
	currency: string
}

type Recipient = {
	account_id: string
	gateway_id: string
}

type PaymentMethod = {
	type: string
	id: string
	isSaved: boolean
}

type Confirmation = {
	type: string
	return_url: string
	confirmation_url: string
}

export type TPaymentResponse = {
	id: string
	status: string
	amount: Amount
	recipient: Recipient
	payment_method: PaymentMethod
	created_at: Date
	confirmation: Confirmation
}
