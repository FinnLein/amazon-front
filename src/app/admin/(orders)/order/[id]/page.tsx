import { Metadata, ResolvingMetadata } from 'next'

import { OrderForm } from './OrderForm'
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

export default function ViewOrderPage({ params: { id } }: IParams) {
	return <OrderForm id={+id} />
}
