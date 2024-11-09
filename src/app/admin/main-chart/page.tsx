import { Metadata, NextPage } from 'next'

import { MainChart } from '@/ui/admin/charts/MainChart'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Main chart',
	...NO_INDEX_PAGE
}
const MainChartPage: NextPage = () => {
	return <MainChart />
}

export default MainChartPage
