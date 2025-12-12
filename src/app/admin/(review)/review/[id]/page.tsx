import { Metadata, ResolvingMetadata } from 'next'

import { ReviewForm } from './ReviewForm'
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
		title: `Review ${id}`,
		...NO_INDEX_PAGE
	}
}

export default function ViewReviewPage({ params: { id } }: IParams) {
	return <ReviewForm id={+id} />
}
