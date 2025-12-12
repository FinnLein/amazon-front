import { Metadata } from 'next'

import ManageBrands from '../../../../components/screens/admin/brands/ManageBrands'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Brands',
	...NO_INDEX_PAGE
}

export default function BrandsPage() {
	return <ManageBrands />
}
