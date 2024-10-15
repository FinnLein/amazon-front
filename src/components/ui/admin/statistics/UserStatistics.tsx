'use client'

import { useQuery } from '@tanstack/react-query'
import { m } from 'framer-motion'
import { AreaChart, BarChart2 } from 'lucide-react'
import { FC } from 'react'

import { Loader } from '@/ui/Loader'

import { itemVariants } from './user-statistics-animation'
import { COLORS } from '@/constants/color.constants'
import { StatisticsService } from '@/services/statistics/statistics.service'

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
				<m.div className='grid grid-cols-3 gap-4 text-black-700'>
					{data?.map((i, index) => (
						<m.div
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
							transition={{ delay: 0.2 * index }}
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
