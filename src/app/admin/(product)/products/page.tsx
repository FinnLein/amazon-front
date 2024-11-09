import { Metadata, NextPage } from 'next'

import { ManageProducts } from './ManageProducts'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Products',
	...NO_INDEX_PAGE
}

const AdminProductsPage: NextPage = () => {
	return <ManageProducts />
}

export default AdminProductsPage
