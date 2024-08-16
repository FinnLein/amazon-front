import { TCartItem } from '@/types/cart.type'

export interface ICartInitialState {
	items: TCartItem[]
}

export interface IAddToCartPayload extends Omit<TCartItem, 'id'> {}


export interface IChangeQuantityPayload extends Pick<TCartItem, 'id'> {
	type: 'minus' | 'plus'
}
