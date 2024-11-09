import { Metadata } from 'next'

import { UserForm } from '../../../../../components/ui/fields/user-form/UserForm'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'User',
	...NO_INDEX_PAGE
}

export default function CreateUserPage() {
	return <UserForm type='create' />
}
