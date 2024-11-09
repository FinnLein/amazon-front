import { Metadata, ResolvingMetadata } from 'next'

import { UserForm } from '../../../../../../components/ui/fields/user-form/UserForm'

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
	return <UserForm type='edit' id={id} />
}
