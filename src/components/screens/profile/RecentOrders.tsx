import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Heading from '@/ui/Heading'
import { Loader } from '@/ui/Loader'

import { useOrders } from '@/hooks/useOrders'

import { convertPrice } from '@/utils/convertPrice'

import { SERVER_URL } from '@/constants/main.constants'

const RecentOrders: FC = () => {
	const { recentOrders, isLoadingRecentOrders } = useOrders()
	return (
		<>
			<Heading className='xl'>Recent orders</Heading>
			{isLoadingRecentOrders ? (
				<Loader />
			) : (
				<div className='flex justify-center'>
					<div className='flex gap-10'>
						{recentOrders?.map(o => (
							<div
								key={o.id}
								className='shadow-lg rounded-lg p-4  inline-grid grid-cols-auto-fill-100'
							>
								{o.items.map(i => (
									<div key={i.product.id} className='flex-1 min-h-52 '>
										<Link href={`/products/${i.product.slug}`}>
											<Image
												className='rounded-lg'
												height={100}
												width={100}
												alt=''
												src={
													i.product.images[0].includes('http')
														? i.product.images[0]
														: SERVER_URL + i.product.images[0]
												}
											/>
											<div className='text-md'>{i.product.name}</div>
										</Link>

										<div className='text-sm'>
											{convertPrice(i.product.price)}
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default RecentOrders
