import cn from 'clsx'

import { useFilters } from '../filters/useFilters'
import Dropdown from '../select/Dropdown'
import { IDropdown } from '../select/dropdown.interface'

import { SORT_SELECT_DATA } from './sort-select.data'
import { EnumProductSort } from '@/services/product/product.types'

export function SortDropdown({
	bg,
	className
}: Pick<IDropdown, 'bg' | 'className'>) {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<div className={cn('text-right z-20', className)}>
			<Dropdown<EnumProductSort>
				bg={bg}
				data={SORT_SELECT_DATA}
				onChange={value => updateQueryParams('sort', value.key.toString())}
				value={SORT_SELECT_DATA.find(value => value.key === queryParams.sort)}
				title='Sort by'
			/>
		</div>
	)
}
