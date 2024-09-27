'use client'

import { OrderService } from '@/services/order/order.service'
import Heading from '@/ui/Heading'
import { convertPrice } from '@/utils/convertPrice'
import { useQuery } from '@tanstack/react-query'

const MyOrders = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['my orders'],
		queryFn: () => OrderService.getAll(),
		select: ({ data }) => data
	})

	return (
		<>
			<Heading>My orders</Heading>

			<section>
				{data?.length ? (
					data?.map(order => (
						<div
							className='rounded-lg bg-white shadow flex gap-5 p-7 my-3'
							key={order.id}
						>
							<span className='text-primary'>#{order.id}</span>
							<span>{order.status}</span>
							<span>{new Date(order.createdAt).toLocaleDateString()}</span>
							<span>{convertPrice(order.total)}</span>
						</div>
					))
				) : (
					<div>Order not found</div>
				)}
			</section>
		</>
	)
}

export default MyOrders
