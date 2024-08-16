import { FC, PropsWithChildren } from 'react'

import cn from 'clsx'

interface IHeading {
	className?: string
}

const Heading: FC<PropsWithChildren<IHeading>> = ({ className, children }) => {
	return (
		<h1
			className={cn(
				`text-opacity-80 font-semibold ${className?.includes('xl') ? '' : 'text-3xl'} ${className}`
			)}
		>
			{children}
		</h1>
	)
}

export default Heading
