import { OrderService } from '@/services/order/order.service'
import { useCartStore } from '@/store/cart/cartStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useOrders = () => {
	const { push } = useRouter()
	const { items } = useCartStore()

	const { data: allOrders, isLoading: isLoadingAllOrders } = useQuery({
		queryKey: ['my orders'],
		queryFn: () => OrderService.getAll(),
		select: ({ data }) => data
	})

	const { data: recentOrders, isLoading: isLoadingRecentOrders } = useQuery({
		queryKey: ['get recently orders'],
		queryFn: () => OrderService.getRecently(),
		select: ({ data }) => data
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
