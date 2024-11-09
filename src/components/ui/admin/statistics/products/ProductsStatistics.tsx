'use client'

import { m } from 'framer-motion'
import { ChartNoAxesGantt } from 'lucide-react'

import { IProductsStatisticsResponse } from '@/types/statistics.interface'

import { itemVariants } from '../users/user-statistics-animation'

import { COLORS } from '@/constants/color.constants'

export default function ProductsStatistics({
	data
}: {
	data: IProductsStatisticsResponse
}) {
	return (
		<m.div className='text-black-700 flex justify-center'>
			<m.div
				variants={itemVariants}
				initial='initial'
				whileInView='animate'
				whileHover='hover'
				className='grid p-5 justify-items-center grid-cols-2 bg-bg-color rounded-lg'
				key={data.name}
			>
				<div className='h-full'>
					<div>{data.name}</div>
					<div className='font-bold'>{data.value}</div>
				</div>
				<div className='flex flex-end'>
					<ChartNoAxesGantt size={45} color={COLORS.aqua} />
				</div>
			</m.div>
		</m.div>
	)
}
