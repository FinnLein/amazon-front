'use client'

import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { push } = useRouter()

	return (
		<div>
			<div
				className='text-white bg-secondary grid border border-solid border-gray/10 rounded-xl overflow-hidden text-sm '
				style={{ gridTemplateColumns: '1fr 0.1fr' }}
			>
				<input
					placeholder='Search...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='bg-transparent px-4 py-4 outline-none focus:brightness-110'
				/>
				<button
					className='flex items-center justify-center p-2.5 hover:brightness-110 transition-colors duration-300 ease-in-out'
					onClick={() => push(`/explorer?searchTerm=${searchTerm}`)}
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
