import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { TCartItem } from '@/types/cart.type'
import { ICartInitialState } from './cart.types'

const initialState: ICartInitialState = {
	items: []
}
interface ICartState {
	items: TCartItem[]
	addToCart: (item: TCartItem, quantity: number, price: number) => void
	removeFromCart: (id: number) => void
	changeQuantity: (id: number, type: 'minus' | 'plus') => void
	reset: () => void
}

export const useCartStore = create<ICartState>()(
	devtools(
		persist(
			set => ({
				...initialState,
				addToCart: (item, quantity, price) =>
					set(state => {
						const existingItem = state.items.find(i => i.id === item.id)

						if (existingItem) {
							return {
								items: state.items.map(i =>
									i.product.id === item.id
										? { ...i, quantity: i.quantity + quantity }
										: i
								)
							}
						}
						return {
							items: [
								...state.items,
								{ id: item.id, product: item.product, quantity, price }
							]
						}
					}),
				removeFromCart: id =>
					set(state => ({ items: state.items.filter(item => item.id !== id) })),
				changeQuantity: (id, type) =>
					set(state => ({
					  items: state.items.map(item => {
						if (item.id === id) {
						  const newQuantity = type === 'plus' ? ++item.quantity : --item.quantity
						  return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
						}
						return item
					  })
					})),
				  
				reset: () =>
					set(items => ({
						items: []
					}))
			}),
			{ name: 'cart' }
		)
	)
)
