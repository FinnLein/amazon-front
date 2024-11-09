import cn from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { useOutside } from '@/hooks/useOutside'

import { IDropdown } from './dropdown.interface'

export default function Dropdown<K>({
	data,
	onChange,
	value,
	title,
	bg
}: IDropdown<K>) {
	const { isShow, setIsShow, ref } = useOutside(false)

	return (
		<div
			ref={ref}
			className={cn('relative inline-block w-full text-left rounded-lg')}
		>
			<button
				className='border rounded-md shadow-sm px-4 py-2 font-medium text-left z-10 bg-secondary border-slate-800 text-white hover:bg-black-700'
				onClick={() => setIsShow(!isShow)}
			>
				{title && <b className='mr-2 text-slate-300'>{title}</b>}
				{value?.label || 'Select'}
				<ChevronDown className='ml-2 h-4 w-4 inline-block text-slate-400' />
			</button>
			<AnimatePresence>
				{isShow && (
					<m.ul
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className={cn(
							'absolute z-10 mt-1 w-full  py-1 ring-1 ring-black-950 ring-opacity-5 overflow-auto focus:outline-none sm:text-sm shadow-lg max-h-60 rounded-lg',
							{
								'bg-white': bg === 'light',
								'border-gray': bg === 'light',
								'bg-black-700': bg === 'dark',
								'border-black-700': bg === 'dark'
							}
						)}
						role='list-box'
					>
						{data.map(item => {
							return (
								<li
									key={item.key?.toString()}
									className={cn(
										'cursor-pointer select-none relative py-2 pl-3 pr-9 rounded-lg hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 ease-in-out',
										{
											'bg-primary text-white': item.key === value?.key,
											'text-white': bg === 'dark',
											'text-black-700': bg === 'light'
										}
									)}
									onClick={() => {
										onChange(item)
										setIsShow(false)
									}}
								>
									<span
										className={cn('block truncate', {
											'font-semibold': item.key === value?.key
										})}
									>
										{item.label}
									</span>
								</li>
							)
						})}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
