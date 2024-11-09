import { Metadata, ResolvingMetadata } from 'next'

import { CategoryForm } from '@/ui/fields/category-form/CategoryForm'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

interface IParams {
	params: {
		id: string
	}
}

export async function generateMetadata(
	{ params: { id } }: IParams,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: `Editing category ${id}`,
		...NO_INDEX_PAGE
	}
}

export default function EditCategoryPage({ params: { id } }: IParams) {
	return <CategoryForm type='edit' id={id} />
}
