import { m } from 'framer-motion'

import Range from '@/ui/range/Range'

import { useManageProducts } from '@/hooks/useProducts'

import { hExpandAnimation } from '@/utils/animations/animations.data'

import { FilterWrapper } from '../FilterWrapper'
import { useFilters } from '../useFilters'

export function PriceGroup() {
	const { maxPrice, minPrice } = useManageProducts()

	const { queryParams, updateQueryParams } = useFilters()

	return (
		<FilterWrapper title='Price from/to'>
			<m.div
				variants={hExpandAnimation}
				initial='initial'
				exit='exit'
				animate='animate'
			>
				<Range
					max={minPrice as number}
					min={maxPrice as number}
					fromInitialValue={queryParams.minPrice}
					toInitialValue={queryParams.maxPrice}
					onChangeFromValue={value => updateQueryParams('minPrice', value)}
					onChangeToValue={value => updateQueryParams('maxPrice', value)}
				/>
			</m.div>
		</FilterWrapper>
	)
}
