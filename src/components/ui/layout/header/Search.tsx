import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { push } = useRouter()

	return (
		<div>
			<div
				className='grid border border-solid border-gray/10 rounded-xl overflow-hidden'
				style={{ gridTemplateColumns: '1fr 0.1fr' }}
			>
				<input
					placeholder='Search...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='bg-[#22303E] text-white px-4 py-2 text-sm outline-none'
				/>

				<button
					className='bg-primary text-white flex items-centSer justify-center p-2.5 '
					onClick={() => push(`/q?term=${searchTerm}`)}
                    aria-label='найти'
				>
					<BsSearch />
				</button>
			</div>
		</div>
	)
}

export default Search
