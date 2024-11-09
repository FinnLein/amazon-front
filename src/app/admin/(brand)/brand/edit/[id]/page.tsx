import { Metadata, ResolvingMetadata } from 'next'

import { BrandForm } from '@/ui/fields/brand-form/BrandForm'

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
		title: `Editing brand ${id}`,
		...NO_INDEX_PAGE
	}
}

export default function EditBrandPage({ params: { id } }: IParams) {
	return <BrandForm type='edit' id={id} />
}
