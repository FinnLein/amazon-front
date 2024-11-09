import { Metadata, NextPage } from 'next'

import ManageCategories from './ManageCategories'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Categories',
	...NO_INDEX_PAGE
}

const CategoryPage: NextPage = () => {
	return <ManageCategories />
}

export default CategoryPage
