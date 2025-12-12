'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { Rating } from 'react-simple-star-rating'

import Heading from '@/ui/Heading'
import { Loader } from '@/ui/Loader'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { SERVER_URL } from '@/constants/main.constants'
import { ReviewService } from '@/services/review/review.service'

export function ReviewForm({ id }: { id: number }) {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['get review', id],
		queryFn: () => ReviewService.getById(id)
	})
	debugger
	return (
		<div className='text-white'>
			{isLoading ? (
				<Loader className='flex justify-center' />
			) : (
				<div>
					<div className='flex items-center justify-between'>
						<Heading>View {data?.id}</Heading>
						<div>
							{new Date(data?.createdAt as string).toLocaleDateString()}
						</div>
					</div>
					<div>
						<div className='flex gap-10'>
							<Image
								width={150}
								height={150}
								alt='user'
								src={
									data?.user.avatarPath.includes('http')
										? data?.user.avatarPath
										: SERVER_URL + data?.user.avatarPath
								}
							/>
							<div>
								<div>{data?.user.name}</div>
								<Link href={ADMIN_PAGES.USER + `/${data?.user.id}`}>
									{data?.user.email}
								</Link>
							</div>
						</div>
						<div>
							<Rating
								readonly
								initialValue={data?.rating}
								SVGstyle={{ display: 'inline-block' }}
								size={20}
								allowFraction
								transition
							/>
						</div>
						<div className='py-4 bg-'>{data?.text}</div>
					</div>
				</div>
			)}
		</div>
	)
}
