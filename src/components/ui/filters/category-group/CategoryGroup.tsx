import { m } from 'framer-motion'

import { Checkbox } from '@/ui/checkbox/Checkbox'

import { ICategory } from '@/types/category.interface'

import { hExpandAnimation } from '@/utils/animations/animations.data'

import { FilterWrapper } from '../FilterWrapper'
import { useFilters } from '../useFilters'

import { useManageCategories } from '@/screens/admin/categories/useManageCategories'

export function CategoryGroup() {
	const { categories } = useManageCategories()

	const handleOnClick = ({ name }: ICategory) => {
		if (queryParams.category === name) {
			updateQueryParams('category', '')
		} else {
			updateQueryParams('category', name)
		}
	}

	const { queryParams, updateQueryParams } = useFilters()
	return (
		<FilterWrapper title='Category'>
			{(categories || []).map(category => (
				<m.div
					variants={hExpandAnimation}
					initial='initial'
					exit='exit'
					animate='animate'
				>
					<Checkbox
						key={category.id}
						isChecked={queryParams.category === category.name}
						onClick={() => handleOnClick(category)}
						className='mb-2 text-lg'
					>
						<m.span className='inline-flex text-base items-center gap-1 '>
							{category.name}
						</m.span>
					</Checkbox>
				</m.div>
			))}
		</FilterWrapper>
	)
}
