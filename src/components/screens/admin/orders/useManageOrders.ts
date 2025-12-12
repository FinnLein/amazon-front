'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { useFilters } from '@/ui/filters/useFilters'

import { OrderService } from '@/services/order/order.service'

export const useManageOrders = () => {
	const { queryParams } = useFilters()

	const { data, isLoading, isFetching, isPending, refetch } = useQuery({
		queryKey: ['get all orders', queryParams],
		queryFn: () => OrderService.getAll(queryParams)
	})

	const { mutate: deleteOrder } = useMutation({
		mutationKey: ['delete order'],
		mutationFn: (id: number) => OrderService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const orders = data?.items ? data?.items : null

	return {
		orders,
		deleteOrder,
		isLoading: isLoading || isFetching || isPending,
		totalCount: data?.totalCount
	}
}
