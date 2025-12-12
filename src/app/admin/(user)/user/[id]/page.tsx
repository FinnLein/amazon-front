import { Metadata, ResolvingMetadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export interface IParams {
	params: {
		id: string
	}
}

export async function generateMetadata(
	{ params: { id } }: IParams,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: `Editing user ${id}`,
		...NO_INDEX_PAGE
	}
}

export default function UpdateUserPage({ params: { id } }: IParams) {
	return <div>User №{id}</div>
}
