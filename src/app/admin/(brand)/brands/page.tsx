import { Metadata, NextPage } from 'next'

import ManageBrands from './ManageBrands'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Brands',
	...NO_INDEX_PAGE
}

export default function BrandsPage ()  {
	return <ManageBrands />
}

