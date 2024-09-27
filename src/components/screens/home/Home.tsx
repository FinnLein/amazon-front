'use client'

import { TypePaginationProduct } from '@/types/product.type'
import PaginationCatalog from '@/ui/catalog/PaginationCatalog'
import { FC } from 'react'

const Home: FC<TypePaginationProduct> = ({ products, length }) => {
	return (
		<>
			<PaginationCatalog title='Catalog' data={{ products, length }} />
		</>
	)
}

export default Home
