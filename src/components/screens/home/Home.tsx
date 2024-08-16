import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { TypePaginationProduct } from '@/types/product.type'
import PaginationCatalog from '@/ui/catalog/PaginationCatalog'
import Heading from '@/ui/Heading'
import Layout from '@/ui/layout/Layout'
import { FC } from 'react'

const Home: FC<TypePaginationProduct> = ({ products, length }) => {
	const { user } = useAuth()
	const { logout } = useActions()

	return (
		<>
			<Heading>Hello Darling!</Heading>
			<Layout>
				{!!user && <button onClick={() => logout()}>Logout</button>}
				<PaginationCatalog
					title='Catalog'
					data={{ products, length }}
				/>
			</Layout>
		</>
	)
}

export default Home
