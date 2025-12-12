import { Metadata, NextPage } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import CategoryChart from '@/screens/admin/charts/CategoryChart'

export const metadata: Metadata = {
	title: 'Categories chart',
	...NO_INDEX_PAGE
}

const CategoryChartPage: NextPage = () => {
	return (
		<div className='w-2/3 m-auto'>
			<CategoryChart />
		</div>
	)
}

export default CategoryChartPage
