'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Rating } from 'react-simple-star-rating'

import Heading from '@/ui/Heading'
import { Loader } from '@/ui/Loader'
import Button from '@/ui/button/Button'
import TextEditor from '@/ui/text-editor/TextEditor'

import { IReviewFields } from './review-fields.interface'
import { ReviewService } from '@/services/review/review.service'

export function LeaveReviewForm({ productId }: { productId: number }) {
	const {
		handleSubmit,
		formState: { errors },
		register: formRegister,
		reset,
		control
	} = useForm<IReviewFields>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['leave review'],
		mutationFn: (data: IReviewFields) => ReviewService.create(productId, data),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['get product', productId] })
			toast.success('Review successfully published')
		},
		onError() {
			toast.error('Все поля должны быть заполнены')
		}
	})

	const onSubmit: SubmitHandler<IReviewFields> = data => {
		mutate(data)
		reset()
	}

	return (
		<div className=''>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Heading className='text-center mb-4'>Leave a review</Heading>
				{isPending ? (
					<Loader />
				) : (
					<div>
						<Controller
							control={control}
							name='rating'
							render={({ field: { onChange, value } }) => (
								<Rating
									onClick={onChange}
									initialValue={value}
									SVGstyle={{ display: 'inline-block' }}
									size={20}
									transition
								/>
							)}
							rules={{
								required: 'Rating is required'
							}}
						/>
						<Controller
							control={control}
							name='text'
							render={({ field: { onChange, value } }) => (
								<TextEditor
									isToolbarExist={false}
									onChange={onChange}
									value={value}
									placeholder='Your text here'
								/>
							)}
							rules={{
								required: 'Comment is required'
							}}
						/>
						<div className='text-center mb-2 mt-8'>
							<Button type='submit' variant='orange'>
								Place
							</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}
