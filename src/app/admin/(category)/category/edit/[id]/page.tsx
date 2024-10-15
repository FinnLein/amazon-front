import { NextPage } from 'next'

import { CategoryForm } from '@/ui/fields/category-form/CategoryForm'

interface IParams {
	params: {
		id: string
	}
}

const EditCategoryPage: NextPage<IParams> = ({ params: { id } }) => {
	return <CategoryForm type='edit' id={id} />
}

export default EditCategoryPage
