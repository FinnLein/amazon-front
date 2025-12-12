'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import Heading from '@/ui/Heading'
import { Loader } from '@/ui/Loader'

import { SERVER_URL } from '@/constants/main.constants'
import { OrderService } from '@/services/order/order.service'

export function OrderForm({ id }: { id: number }) {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['get order', id],
		queryFn: () => OrderService.getById(id)
	})
	debugger
	return (
		<div className='text-white'>
			{isLoading ? (
				<Loader className='flex justify-center' />
			) : (
				<div>
					<div className='flex items-center justify-between'>
						<Heading>View order №{data?.id}</Heading>
						<div>
							{new Date(data?.createdAt as string).toLocaleDateString()}
						</div>
					</div>
					<div>
						<div className='flex gap-10'>
							{data?.items.map(i => (
								<Image
									alt='Products'
									width={150}
									height={150}
									src={
										i.product.images[0].includes('http')
											? i.product.images[0]
											: SERVER_URL + i.product.images[0]
									}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
