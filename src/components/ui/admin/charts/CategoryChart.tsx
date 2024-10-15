'use client'

import { StatisticsService } from '@/services/statistics/statistics.service'
import { Loader } from '@/ui/Loader'
import { useQuery } from '@tanstack/react-query'
import {
    ArcElement,
    Chart,
    ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(
	Title,
	Tooltip,
	Legend,
	LinearScale,
    ArcElement
)

const options: ChartOptions<'doughnut'> = {
    elements: {
        arc: {
            
        }
    },
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
	
	color: '#ffffff'
}

export const CategoryChart = () => {
	const { data, isPending } = useQuery({
		queryKey: ['get category chart'],
		queryFn: () => StatisticsService.getMostExpensiveProductsByCategory(),
		select: ({ data }) => data
	})

	

	const dataChart: ChartData<'doughnut', number[], string> = {
		labels: data?.map(i => i.category?.name),
		datasets: [
			{
				label: 'Most expensive products by category',
				data: data?.map(i => i.price) || [],
                backgroundColor: [
                    'rgb(255, 99, 132)',   // Красный
                    'rgb(54, 162, 235)',   // Синий
                    'rgb(255, 205, 86)',   // Желтый
                    'rgb(75, 192, 192)',   // Бирюзовый
                    'rgb(153, 102, 255)',  // Фиолетовый
                    'rgb(255, 159, 64)',   // Оранжевый
                    'rgb(201, 203, 207)',  // Серый
                    'rgb(255, 99, 71)',    // Томато
                    'rgb(60, 179, 113)',   // Средне-морской зелёный
                    'rgb(123, 104, 238)',  // Средне-фиолетовый
                    'rgb(0, 191, 255)',    // Глубокий небесный синий
                    'rgb(255, 20, 147)',   // Глубокий розовый
                    'rgb(144, 238, 144)',  // Светло-зелёный
                    'rgb(221, 160, 221)',  // Слива
                    'rgb(255, 218, 185)',  // Персиковый пух
                    'rgb(70, 130, 180)'    // Стальной синий
                  ],
                  
			}
		]
	}

	return isPending ? <Loader /> : <Doughnut data={dataChart} options={options} />
}

export default CategoryChart
