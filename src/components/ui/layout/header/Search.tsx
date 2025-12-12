'use client'

import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

import { useFilters } from '@/ui/filters/useFilters'

import { useFiltersStore } from '@/store/filters/filtersStore'

import { useDebounce } from '@/hooks/useDebounce'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debounceSearchTerm = useDebounce(searchTerm, 500)

	const { updateQueryParams } = useFilters()

	useEffect(() => {
		updateQueryParams('searchTerm', debounceSearchTerm)
	}, [debounceSearchTerm])



	return (
		<div>
			<div
				className='text-white bg-secondary grid border border-solid border-gray/10 rounded-xl overflow-hidden text-sm '
				style={{ gridTemplateColumns: '1fr 0.1fr' }}
			>
				<input
					type='text'
					placeholder='Search...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='bg-transparent px-4 py-4 outline-none focus:animate-pulse'
				/>
				<button
					className='flex items-center justify-center p-2.5 hover:brightness-110 transition-colors duration-300 ease-in-out'
					aria-label='найти'
					disabled={!searchTerm}
				>
					<BsSearch />
				</button>
			</div>
		</div>
	)
}

export default Search
