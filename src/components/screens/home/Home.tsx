'use client'

import { FC } from 'react'

import PaginationCatalog from '@/ui/catalog/PaginationCatalog'

const Home: FC = () => {
	return (
		<>
			<PaginationCatalog title='Catalog' />
			<PaginationCatalog title='Fresh' />
			<PaginationCatalog title='Catalog' />
		</>
	)
}

export default Home
