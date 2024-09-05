import { FC } from 'react'

import PaginationCatalog from '@/ui/catalog/PaginationCatalog'
import Layout from '@/ui/layout/Layout'


import { useUserStore } from '@/store/user/userStore'
import { TypePaginationProduct } from '@/types/product.type'

const Home: FC<TypePaginationProduct> = ({ products, length }) => {
	const { user } = useUserStore()
	const { logout } = useUserStore()

	return (
		<>
			<Layout>
				<PaginationCatalog title='Catalog' data={{ products, length }} />
			</Layout>
		</>
	)
}

export default Home
