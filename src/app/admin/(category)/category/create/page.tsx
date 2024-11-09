import { Metadata, NextPage } from 'next'

import { CategoryForm } from '@/ui/fields/category-form/CategoryForm'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Creating category',
	...NO_INDEX_PAGE
}

const CreateCategoryPage: NextPage = () => {
	return <CategoryForm type='create' />
}

export default CreateCategoryPage
