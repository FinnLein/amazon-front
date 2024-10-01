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
	scales: {
		y: {
			beginAtZero: true
		}
	}
}

export const MainChart = () => {
	const { data, isPending } = useQuery({
		queryKey: ['main-chart'],
		queryFn: () => StatisticsService.getUsersRegistrationByMonths(),
		select({ data }): ChartData<'line', number[], string> {
			return {
				labels: data.map(i => i.month),
				datasets: [
					{
						label: 'Number of registrations',
						data: data.map(i => i.count),
						borderColor: '#ffffff',
						pointBorderColor: '#ffffff',
						tension: 0
					}
				]
			}
		}
	})

	return isPending ? (
		<Loader />
	) : data ? (
		<Line data={data} options={options} className='mb-6' />
	) : null
}
