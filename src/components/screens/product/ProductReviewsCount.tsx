import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-scroll'

import { ProductRating } from '@/ui/catalog/product-item/ProductRating'

import { IProduct } from '@/types/product.interface'

export function ProductReviewCount({ product }: { product: IProduct }) {
	const reviewsLength = product.reviews.length

	if (!reviewsLength) return null

	return (
		<div>
			<ProductRating product={product} />
			<div>
				<Link
					to='reviews'
					smooth
					offset={-50}
					duration={1000}
					className='opacity-50 font-semibold text-sm cursor-pointer'
				>
					{reviewsLength} Reviews <FiChevronRight className='inline' />
				</Link>
			</div>
		</div>
	)
}
