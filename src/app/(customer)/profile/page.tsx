import { Metadata } from 'next'

import { UserRole } from '@/types/user.interface'

import { protectPage } from '@/utils/server/protect-page'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Profile from '@/screens/profile/Profile'

export const metadata: Metadata = {
	title: 'My profile',
	...NO_INDEX_PAGE
}

export default async function ProfilePage() {
	await protectPage([UserRole.USER])
	return <Profile />
}
