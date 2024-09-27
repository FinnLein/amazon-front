import cn from 'clsx'
import { FC } from 'react'

interface Props {
	value: number
	maxValue: number
	color: 'orange' | 'white'
}

const Badge: FC<Props> = ({ value, maxValue, color }) => {
	return (
		<div
			className={cn(
				'bg-gradient-to-t px-3.5 rounded-2xl shadow-lg w-max [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]',
				{
					'from-orange-700 to-orange-400': color === 'orange',
					'from-gray-700 to-gray-400': color === 'white'
				}
			)}
		>
			{value}/{maxValue}
		</div>
	)
}

export default Badge
