import { m } from 'framer-motion'
import { Rating } from 'react-simple-star-rating'

import { Checkbox } from '@/ui/checkbox/Checkbox'

import { hExpandAnimation } from '@/utils/animations/animations.data'

import { FilterWrapper } from '../FilterWrapper'
import { useFilters } from '../useFilters'

import { RATING_VARIANTS } from './rating-variants.data'
import { updateRatingsQuery } from './update-rating-query'

export function RatingGroup() {
	const { queryParams, updateQueryParams } = useFilters()

	const handleOnClick = (rating: number) => {
		if (queryParams.rating === rating.toString()) {
			updateQueryParams('rating', '')
		} else {
			updateQueryParams(
				'rating',
				updateRatingsQuery(queryParams.rating, rating.toString())
			)
		}
	}

	return (
		<FilterWrapper title='Rating'>
			{RATING_VARIANTS.map(rating => (
				<m.div
					variants={hExpandAnimation}
					initial='initial'
					exit='exit'
					animate='animate'
				>
					<Checkbox
						key={rating}
						isChecked={queryParams.rating?.includes(rating.toString())}
						onClick={() => handleOnClick(rating)}
						className='mb-2 text-lg'
					>
						<Rating
							readonly
							initialValue={rating}
							SVGstyle={{ display: 'inline-block' }}
							size={20}
							transition
						/>
					</Checkbox>
				</m.div>
			))}
		</FilterWrapper>
	)
}
