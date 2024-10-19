'use client'

import { m } from 'framer-motion'
import { FC, useEffect } from 'react'

import { useManageProducts } from '@/hooks/useProducts'

import Heading from '../Heading'
import ShowMore from '../ShowMore'
import { itemVariants } from '../admin/statistics/users/user-statistics-animation'
import SortDropdown from '../select/SortDropdown'

import ProductItem from './product-item/ProductItem'

interface IPaginationCatalog {
	title?: string
}

const PaginationCatalog: FC<IPaginationCatalog> = ({ title }) => {
	const {
		setSortType,
		sortType,
		page,
		products,
		setPage,
		isHasMore,
		isLoading
	} = useManageProducts(4, true, true)

	useEffect(() => {
		setPage(0)
	}, [sortType])

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}

			<SortDropdown sortType={sortType} setSortType={setSortType} />
			{products?.length ? (
				<div className='flex gap-5 items-center'>
					{page > 0 && page ? (
						<ShowMore
							type='left'
							isLoading={isLoading}
							onLoadMore={() => setPage(page - 1)}
						/>
					) : null}
					<div className='grid grid-cols-4 gap-10	'>
						{products.map((product, index) => (
							<m.div
								key={product.id}
								variants={itemVariants}
								initial='initial'
								whileInView='animate'
								transition={{ delay: 0.05 * index }}
							>
								<ProductItem index={index} product={product} />
							</m.div>
						))}
					</div>
					{isHasMore ? (
						<ShowMore
							type='right'
							isLoading={isLoading}
							onLoadMore={() => setPage(page + 1)}
						/>
					) : null}
				</div>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default PaginationCatalog
