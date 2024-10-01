'use client'

import { COLORS } from '@/constants/color.constants'
import { StatisticsService } from '@/services/statistics/statistics.service'
import { Loader } from '@/ui/Loader'
import { useQuery } from '@tanstack/react-query'
import { m } from 'framer-motion'
import { AreaChart, BarChart2 } from 'lucide-react'
import { FC } from 'react'
import { containerVariants, itemVariants, ROTATE_CARD } from './user-statistics-animation'

const UserStatistics: FC = () => {
	const { data, isPending } = useQuery({
		queryKey: ['get users count'],
		queryFn: () => StatisticsService.getUsersCount(),
		select: ({ data }) => data
	})

	return (
		<>
			{isPending ? (
				<Loader />
			) : (
				<m.div variants={containerVariants}  className='grid grid-cols-3 gap-4 text-black'>
					{data?.map((i, index) => (
						<m.div
                            variants={itemVariants}
                            whileHover={ROTATE_CARD.whileHover}
                            transition={ROTATE_CARD.transition}
							key={i.name}
							className='grid justify-items-center  grid-cols-2 py-4 px-2 bg-bg-color rounded-lg'
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
			)}
		</>
	)
}

export default UserStatistics
