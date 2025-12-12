'use client'

import { useQuery } from '@tanstack/react-query'

import { Loader } from '@/ui/Loader'

import ProductsStatistics from './products/ProductsStatistics'
import UserStatistics from './users/UserStatistics'
import { StatisticsService } from '@/services/statistics/statistics.service'

export function MainStatistic() {
	const { data: dataUser, isPending: isPendingUser } = useQuery({
		queryKey: ['get users count'],
		queryFn: () => StatisticsService.getUsersCount(),
		select: ({ data }) => data
	})

	const { data: dataProduct, isPending: isPendingProduct } = useQuery({
		queryKey: ['get products count'],
		queryFn: () => StatisticsService.getProductsCount(),
		select: ({ data }) => data
	})

	const isLoading = isPendingProduct || isPendingUser

	if (isLoading) return <Loader className='flex justify-center' />

	return (
		<div className='flex flex-col gap-4'>
			<UserStatistics data={dataUser || []} />
			{/* <ProductsStatistics data={dataProduct || []} /> */}
		</div>
	)
}
