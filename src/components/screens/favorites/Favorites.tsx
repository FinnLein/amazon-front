'use client'

import Catalog from '@/ui/catalog/Catalog'

import { useProfile } from '@/hooks/useProfile'

const Favorites = () => {
	const {
		user: { favorites }
	} = useProfile()

	return <Catalog products={favorites || []} title='Favorites' />
}

export default Favorites
