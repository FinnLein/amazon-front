import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface IProps {
	isActive: boolean
	setIsActive: (value: boolean) => void
}

const Modal: FC<PropsWithChildren<IProps>> = ({
	isActive,
	setIsActive,
	children
}) => {
	return (
		<div
			className={cn(
				'flex justify-center items-center w-[100%] h-[100%] fixed top-0 left-0 bg-[rgba(0,0,0,0.3)] transition-opacity ease-in-out duration-300',
				{
					'opacity-0 pointer-events-none': !isActive,
					'opacity-100': isActive
				}
			)}
			onClick={() => setIsActive(false)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='cursor-default p-5 rounded-lg bg-bg-color'
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
