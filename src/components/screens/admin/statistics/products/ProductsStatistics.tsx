'use client'

import { m } from 'framer-motion'
import { ChartNoAxesGantt } from 'lucide-react'


import { itemVariants } from '../users/user-statistics-animation'

import { COLORS } from '@/constants/color.constants'
import { IStatisticsResponse } from '@/types/statistics.interface'

export default function ProductsStatistics({
	data
}: {
	data: IStatisticsResponse[]
}) {
	return (
		<m.div className='text-black-700 flex justify-center'>
			{data?.map((i, index) => (
				<m.div
					variants={itemVariants}
					initial='initial'
					whileInView='animate'
					whileHover='hover'
					className='grid p-5 justify-items-center grid-cols-2 bg-bg-color rounded-lg'
					key={index}
				>
					<div className='h-full'>
						<div>{i.name}</div>
						<div className='font-bold'>{i.value}</div>
					</div>
					<div className='flex flex-end'>
						<ChartNoAxesGantt size={45} color={COLORS.aqua} />
					</div>
				</m.div>
			))}
		</m.div>
	)
}
