'use client'

import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { TypePaginationProduct } from '@/types/product.type'

import Heading from '../Heading'
import Button from '../button/Button'
import SortDropdown from '../select/SortDropdown'

import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/productSort.enum'
import ProductItem from './product-item/ProductItem'

interface IPaginationCatalog {
	data: TypePaginationProduct
	title?: string
}

const PaginationCatalog: FC<IPaginationCatalog> = ({ data, title }) => {
	const productsPerPage = 4

	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)

	const [page, setPage] = useState(1)

	const { data: response, isLoading } = useQuery({
		queryKey: ['products', sortType, page],
		queryFn: () =>
			ProductService.getAll({ page, perPage: productsPerPage, sort: sortType }),
		initialData: data
	})

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}

			<SortDropdown sortType={sortType} setSortType={setSortType} />
			{response.products.length ? (
				<>
					<div className='grid grid-cols-4 gap-10	'>
						{response.products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
					<div className='flex justify-center gap-10	 mt-16'>
						{Array.from({ length: response.length / productsPerPage }).map(
							(_, index) => {
								const pageNumber = index + 1
								return (
									<Button
										key={pageNumber}
										size='md'
										variant={page === pageNumber ? 'orange' : 'white'}
										onClick={() => setPage(pageNumber)}
										className='mx-3'
									>
										{pageNumber}
									</Button>
								)
							}
						)}
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default PaginationCatalog
