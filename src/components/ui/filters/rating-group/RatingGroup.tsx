import { Checkbox } from '@/ui/checkbox/Checkbox'

import { FilterWrapper } from '../FilterWrapper'
import { useFilters } from '../useFilters'

import { RATING_VARIANTS } from './rating-variants.data'

export function CategoryGroup() {
	const { queryParams, updateQueryParams } = useFilters()
	return (
		<FilterWrapper title='Rating'>
			{RATING_VARIANTS.map(rating => (
				<Checkbox
					key={rating}
					isChecked={queryParams.rating === rating.toString()}
					onClick={() => updateQueryParams('rating', rating.toString())}
				/>
			))}
		</FilterWrapper>
	)
}
