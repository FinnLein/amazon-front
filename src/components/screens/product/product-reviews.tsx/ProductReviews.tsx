import { useState } from 'react'

import Heading from '@/ui/Heading'
import Modal from '@/ui/modal/Modal'

import { useProfile } from '@/hooks/useProfile'

import { IReview } from '@/types/review.interface'

import { LeaveReviewForm } from './LeaveReviewForm'
import { ReviewItem } from './ReviewItem'

interface IProductReviews {
	reviews: IReview[]
	productId: number
}

export function ProductReview({ reviews, productId }: IProductReviews) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { user } = useProfile()

	return (
		<section className='mt-20' id='reviews'>
			{reviews.length ? (
				<div>
					<div className='mb-9'>
						<Heading className='mb-3'>Reviews:</Heading>
						{user.isLoggedIn && (
							<button
								className='text-aqua'
								onClick={() => setIsModalOpen(true)}
							>
								Leave a review
							</button>
						)}
					</div>
					{user.isLoggedIn && (
						<Modal
							isOpen={isModalOpen}
							closeModal={() => setIsModalOpen(false)}
						>
							<LeaveReviewForm productId={productId} />
						</Modal>
					)}
					<div className='flex flew-wrap gap-10'>
						{reviews.map(r => (
							<ReviewItem key={r.id} review={r} />
						))}
					</div>
				</div>
			) : (
				<div>
					{user.isLoggedIn && (
						<Modal
							isOpen={isModalOpen}
							closeModal={() => setIsModalOpen(false)}
						>
							<LeaveReviewForm productId={productId} />
						</Modal>
					)}
				</div>
			)}
		</section>
	)
}
