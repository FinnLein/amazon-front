'use client'

import { useOrders } from '@/hooks/useOrders'
import Heading from '@/ui/Heading'
import { Loader } from '@/ui/Loader'
import { convertPrice } from '@/utils/convertPrice'
import Image from 'next/image'
import Link from 'next/link'

const MyOrders = () => {
	const { allOrders, isLoadingAllOrders } = useOrders()

	return (
		<>
			<Heading>My orders</Heading>

			<section>
				{isLoadingAllOrders ? (
					<Loader />
				) : (
					<>
						{allOrders?.length ? (
							allOrders?.map(order => (
								<div
									className='rounded-lg bg-white shadow p-7 my-3 grid-rows-2 '
									key={order.id}
								>
									<div className='flex gap-8'>
										<span className='text-primary'>Order#{order.id}</span>
										<span>{order.status}</span>
										<span>
											{new Date(order.createdAt).toLocaleDateString()}
										</span>
										<span>{convertPrice(order.total)}</span>
									</div>
									<div className='grid px-4 py-8 grid-cols-auto-fill-100 gap-16'>
										{order.items.map(i => (
											<>
												<Link
													key={i.id}
													href={`/products/${i.product.slug}`}
													className='inline-grid '
												>
													<Image
														className='rounded-lg'
														alt='Product'
														src={i.product.images[1]}
														height={200}
														width={200}
													/>
													<div>
														{i.quantity} x {i.product.name}
													</div>
												</Link>
											</>
										))}
									</div>
								</div>
							))
						) : (
							<div>Order not found</div>
						)}
					</>
				)}
			</section>
		</>
	)
}

export default MyOrders
