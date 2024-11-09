import { FilterWrapper } from '../FilterWrapper'
import { useFilters } from '../useFilters'

import { useManageCategories } from '@/app/admin/(category)/categories/useManageCategories'

export function CategoryGroup() {
	const { queryParams, updateQueryParams } = useFilters()
	const { categories } = useManageCategories()

	return <FilterWrapper title='Category'></FilterWrapper>
}
