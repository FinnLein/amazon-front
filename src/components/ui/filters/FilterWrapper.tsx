import { AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { PropsWithChildren } from 'react'

import { useOutside } from '@/hooks/useOutside'

export function FilterWrapper({
	title,
	children
}: PropsWithChildren<{ title: string }>) {
	const { isShow, setIsShow } = useOutside(false)

	return (
		<div className='overflow-auto'>
			<div
				onClick={() => setIsShow(!isShow)}
				className='mb-3 text-lg cursor-pointer flex justify-between'
			>
				<span>{title}</span>
				<span>{isShow ? <Minus /> : <Plus />}</span>
			</div>
			<div>
				<AnimatePresence>
					{isShow && <div className=''>{children}</div>}
				</AnimatePresence>
			</div>
		</div>
	)
}
