import { Metadata, ResolvingMetadata } from 'next'

import { ProductForm } from '@/ui/fields/product-form/ProductForm'

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
		title: `Editing product ${id}`,
		...NO_INDEX_PAGE
	}
}

export default function ProductEditPage({ params: { id } }: IParams) {
	return <ProductForm id={id} type='edit' />
}
