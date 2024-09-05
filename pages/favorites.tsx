import { useProfile } from '@/hooks/useProfile'
import { NextAuthPage } from '@/providers/auth-provider/auth-page.types'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'

const FavoritesPage: NextAuthPage = () => {
	const { profile } = useProfile()

	return (
		<Layout>
			<Catalog products={profile?.favorites || []} title='Favorites' />
		</Layout>
	)
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
