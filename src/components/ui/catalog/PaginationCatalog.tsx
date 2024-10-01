'use client'

import { FC } from 'react'

import Heading from '../Heading'
import SortDropdown from '../select/SortDropdown'

import { useManageProducts } from '@/app/(customer)/useManageProducts'
import { m } from 'framer-motion'
import ShowMore from '../ShowMore'
import { productContainerVariants } from './product-item/product-animation'
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
	} = useManageProducts()

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}

			<SortDropdown sortType={sortType} setSortType={setSortType} />
			{products?.length ? (
				<>
					<m.div
						variants={productContainerVariants}
						className='grid grid-cols-4 gap-10	'
					>
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</m.div>
					<div className='flex justify-center gap-10 mt-16'>
						{isHasMore ? (
							<ShowMore
								isLoading={isLoading}
								onLoadMore={() => setPage(page + 1)}
							/>
						) : null}
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default PaginationCatalog
