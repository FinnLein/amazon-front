'use client'

import { IPaginationResponse } from '@/types/pagination.type'
import { TProduct } from '@/types/product.type'
import PaginationCatalog from '@/ui/catalog/PaginationCatalog'
import { FC } from 'react'

const Home: FC = () => {
	return (
		<>
			<PaginationCatalog title='Catalog' />
		</>
	)
}

export default Home
