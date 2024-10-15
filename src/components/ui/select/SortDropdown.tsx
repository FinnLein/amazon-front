import cn from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'

import { EnumProductSort } from '@/services/product/productSort.enum'

interface ISortDropdown {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
	rounded?: 'sm' | 'lg' | 'md'
	bg?: 'light' | 'dark'
}

const SortDropdown: FC<ISortDropdown> = ({
	setSortType,
	sortType,
	rounded,
	bg
}) => {
	return (
		<div
			className={cn('mb-5 z-40 text-right', {
				'rounded-sm': rounded === 'sm',
				'rounded-md': rounded === 'md',
				'rounded-lg': rounded === 'lg'
			})}
		>
			<select
				aria-label='label for the select'
				value={sortType}
				onChange={e => setSortType(e.target.value as any)}
				className={cn('appearance-none py-1 px-2', {
					'bg-white': bg === 'light',
					'border-gray': bg === 'light',
					'bg-black-700': bg === 'dark',
					'border-black-700': bg === 'dark',
					'rounded-sm': rounded === 'sm',
					'rounded-md': rounded === 'md',
					'rounded-lg': rounded === 'lg'
				})}
			>
				{(
					Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
				).map(key => {
					return (
						<option
							className={cn({
								'rounded-sm': rounded === 'sm',
								'rounded-md': rounded === 'md',
								'rounded-lg': rounded === 'lg'
							})}
							key={EnumProductSort[key]}
							value={EnumProductSort[key]}
						>
							{EnumProductSort[key]}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default SortDropdown
