import { NextPage } from 'next'

import { CategoryForm } from '@/ui/fields/category-form/CategoryForm'

const CreateCategoryPage: NextPage = () => {
	return <CategoryForm type='create' />
}

export default CreateCategoryPage
