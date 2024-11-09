import { Metadata } from 'next'

import { UserRole } from '@/types/user.interface'

import { protectPage } from '@/utils/server/protect-page'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Favorites from '@/screens/favorites/Favorites'

export const metadata: Metadata = {
	title: 'Favorites',
	...NO_INDEX_PAGE
}

export default async function FavoritesPage() {
	await protectPage([UserRole.USER])

	return <Favorites />
}
