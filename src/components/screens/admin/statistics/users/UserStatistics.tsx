import { m } from 'framer-motion'
import { AreaChart, BarChart2 } from 'lucide-react'

import { IStatisticsResponse } from '@/types/statistics.interface'

import { itemVariants } from './user-statistics-animation'
import { COLORS } from '@/constants/color.constants'

export default function UserStatistics({
	data
}: {
	data: IStatisticsResponse[]
}) {
	return (
		<m.div className='grid grid-cols-3 gap-4 text-black-700'>
			{data?.map((i, index) => (
				<m.div
					variants={itemVariants}
					initial='initial'
					whileInView='animate'
					whileHover='hover'
					key={i.name}
					className='grid justify-items-center grid-cols-2 py-4 px-2 bg-bg-color rounded-lg'
				>
					<div className='h-full'>
						<div>{i.name}</div>
						<div className='font-bold'>{i.value}</div>
					</div>
					<div className='flex items-end'>
						{index % 2 === 0 ? (
							<AreaChart size={45} color={COLORS.aqua} />
						) : (
							<BarChart2 size={45} color={COLORS.gray} />
						)}
					</div>
				</m.div>
			))}
		</m.div>
	)
}
