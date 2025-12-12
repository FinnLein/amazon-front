import { Metadata, NextPage } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { MainChart } from '@/screens/admin/charts/MainChart'

export const metadata: Metadata = {
	title: 'Main chart',
	...NO_INDEX_PAGE
}
const MainChartPage: NextPage = () => {
	return <MainChart />
}

export default MainChartPage
