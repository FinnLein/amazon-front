import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { useCartStore } from '@/store/cart/cartStore'

import { useProfile } from './useProfile'
import { OrderService } from '@/services/order/order.service'

export const useOrders = () => {
	const { reset } = useCartStore()

	const { push } = useRouter()
	const { items } = useCartStore()
	const {
		user: { isLoggedIn }
	} = useProfile()

	const { data: allOrders, isLoading: isLoadingAllOrders } = useQuery({
		queryKey: ['my orders'],
		queryFn: () => OrderService.getByCurrentUser(),
		select: ({ data }) => data,
		enabled: isLoggedIn
	})

	const { data: recentOrders, isLoading: isLoadingRecentOrders } = useQuery({
		queryKey: ['get recently orders'],
		queryFn: () => OrderService.getRecently(),
		select: ({ data }) => data,
		enabled: isLoggedIn
	})

	const { mutate } = useMutation({
		mutationKey: ['create order and payment'],
		mutationFn: () =>
			OrderService.place({
				items: items.map(item => ({
					quantity: item.quantity,
					price: item.price,
					productId: item.product.id
				}))
			}),
		onSuccess({ data }) {
			reset()
			push(data.confirmation.confirmation_url)
		}
	})

	return {
		mutate,
		allOrders,
		recentOrders,
		isLoadingAllOrders,
		isLoadingRecentOrders
	}
}
