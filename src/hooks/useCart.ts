import { useCartStore } from '@/store/cart/cartStore'

export const useCart = () => {
	const items = useCartStore(state => state.items)

	const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

	// const { push } = useRouter()

	return { items, total }
}
