import { Metadata, NextPage } from 'next'

import { ManageUsers } from './ManageUsers'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Users',
	...NO_INDEX_PAGE
}
const ManageUsersPage: NextPage = () => {
	return <ManageUsers />
}

export default ManageUsersPage
