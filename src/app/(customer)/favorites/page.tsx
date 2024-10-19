import { UserRole } from '@/types/user.type'

import { protectPage } from '@/utils/server/protect-page'

import Favorites from '@/screens/favorites/Favorites'

export default async function FavoritesPage() {
	await protectPage([UserRole.USER])

	return <Favorites />
}
