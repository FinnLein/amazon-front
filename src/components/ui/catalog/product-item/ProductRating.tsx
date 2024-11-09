'use client'

import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

import { IProduct } from '@/types/product.interface'

interface IProductRating {
	product: IProduct
	isText?: boolean
}

const ProductRating: FC<IProductRating> = ({ product, isText = false }) => {
	const [rating, setRating] = useState<number>()

	return (
		<div className='mb-2'>
			{!!product.reviews?.length && (
				<span className='mr-1'>
					<Rating
						readonly
						initialValue={product.rating}
						SVGstyle={{ display: 'inline-block' }}
						size={20}
						allowFraction
						transition
					/>
					<span className='text-sm ml-1 color-[#ffffff]'>{product.rating}</span>
				</span>
			)}

			{isText && (
				<span className='text-xs'>({product.reviews?.length} reviews)</span>
			)}
		</div>
	)
}

export default ProductRating
