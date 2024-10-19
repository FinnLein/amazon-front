'use client'

import { m } from 'framer-motion'
import { ChartNoAxesGantt, Kanban } from 'lucide-react'

import { TStatisticsResponse } from '@/types/statistics.type'

import { itemVariants } from '../users/user-statistics-animation'

import { COLORS } from '@/constants/color.constants'

export default function ProductsStatistics({
	data
}: {
	data: TStatisticsResponse
}) {
	return (
		<m.div className='grid grid-cols-2 gap-4 justify-items-center text-black-700'>
			{data?.map((p, index) => (
				<m.div
					transition={{ delay: index * 0.4 }}
					variants={itemVariants}
					initial='initial'
					whileInView='animate'
					whileHover={{
						rotateX: 10,
						rotateY: -8,
						x: 5,
						y: -10,
						z: 0,
						boxShadow: '1px 1px 7px rgb(253,230,138,1)'
					}}
					className='grid justify-items-center grid-cols-2 p-4 bg-bg-color rounded-lg'
					key={p.name}
				>
					<div className='h-full'>
						<div>{p.name}</div>
						<div className='font-bold'>{p.value}</div>
					</div>
					<div className='flex flex-end'>
						{index % 2 === 0 ? (
							<ChartNoAxesGantt size={45} color={COLORS.aqua} />
						) : (
							<Kanban size={45} color={COLORS.gray} />
						)}
					</div>
				</m.div>
			))}
		</m.div>
	)
}
