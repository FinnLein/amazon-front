import parse from 'html-react-parser'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

import { IReview } from '@/types/review.interface'

import { SERVER_URL } from '@/constants/main.constants'

export function ReviewItem({ review }: { review: IReview }) {
	return (
		<div className='bg-white w-72 rounded-lg shadow-md p-6'>
			<div className='flex items-center mb-2'>
				<Image
					alt={review.user.name}
					src={
						review.user.avatarPath.includes('http')
							? review.user.avatarPath
							: SERVER_URL + review.user.avatarPath
					}
					width={40}
					height={40}
					className='mr-3 block rounded-full'
				/>
				<span>{review.user.name}</span>
			</div>
			<Rating
				readonly
				initialValue={review.rating}
				SVGstyle={{
					display: 'inline-block'
				}}
				size={20}
				allowFraction
				transition
			/>
			<div className='text-sm mt-4 leading-relaxed'>{parse(review.text)}</div>
		</div>
	)
}
