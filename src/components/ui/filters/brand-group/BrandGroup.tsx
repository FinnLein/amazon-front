import { m } from 'framer-motion'

import { Checkbox } from '@/ui/checkbox/Checkbox'

import { IBrand } from '@/types/brand.interface'

import { hExpandAnimation } from '@/utils/animations/animations.data'

import { FilterWrapper } from '../FilterWrapper'
import { useFilters } from '../useFilters'

import { useManageBrands } from '@/screens/admin/brands/useManageBrands'

export function BrandGroup() {
	const { brands } = useManageBrands()

	const handleOnClick = (brand: IBrand) => {
		if (queryParams.brand === brand.name) {
			updateQueryParams('brand', '')
		} else {
			updateQueryParams('brand', brand.name)
		}
	}

	const { queryParams, updateQueryParams } = useFilters()
	return (
		<FilterWrapper title='Brand'>
			{(brands || []).map(brand => (
				<m.div
					variants={hExpandAnimation}
					initial='initial'
					exit='exit'
					animate='animate'
				>
					<Checkbox
						key={brand.id}
						isChecked={queryParams.brand === brand.name}
						onClick={() => handleOnClick(brand)}
						className='mb-2 text-lg'
					>
						<m.span className='inline-flex text-base items-center gap-1'>
							{brand.name}
						</m.span>
					</Checkbox>
				</m.div>
			))}
		</FilterWrapper>
	)
}
