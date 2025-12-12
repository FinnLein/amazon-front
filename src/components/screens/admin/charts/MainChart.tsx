'use client'

import { StatisticsService } from '@/services/statistics/statistics.service'
import { Loader } from '@/ui/Loader'
import { useQuery } from '@tanstack/react-query'
import {
	CategoryScale,
	Chart,
	ChartData,
	ChartOptions,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip
} from 'chart.js'
import { Line } from 'react-chartjs-2'

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Legend,
	Title,
	Tooltip
)

const options: ChartOptions<'line'> = {
	responsive: true,
	scales: {
		y: {
			beginAtZero: true
		}
	},
	animations: {
		tension: {
			duration: 5000,
			to: 1,
			from: 0.1,
			loop: true,
			easing: 'linear'
		}
	},
	borderColor: '#ffffff',
	backgroundColor: '#ffffff',
	color: '#ffffff'
}

export const MainChart = () => {
	const { data, isPending } = useQuery({
		queryKey: ['main-chart'],
		queryFn: () => StatisticsService.getUsersRegistrationByMonths(),
		select: ({ data }) => data
	})

	const dataChart: ChartData<'line', number[], string> = {
		labels: data?.map(i => i.month),
		datasets: [
			{
				label: 'Number of registrations',
				data: data?.map(i => i.count) || [],
				tension: 0.1
			}
		]
	}

	return isPending ? (
		<Loader />
	) : data ? (
		<Line data={dataChart} options={options} className='mb-6' />
	) : null
}
