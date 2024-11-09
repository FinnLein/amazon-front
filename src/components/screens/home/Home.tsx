'use client'

import cn from 'clsx'
import { useEffect } from 'react'

import Catalog from '@/ui/catalog/Catalog'
import { CatalogNav } from '@/ui/catalog/CatalogNav'
import { useFilters } from '@/ui/filters/useFilters'
import { Pagination } from '@/ui/pagination/Pagination'

import { useSidebarStore } from '@/store/sidebar/sidebarStore'

import { useManageProducts } from '@/hooks/useProducts'

import { IPaginationResponse } from '@/types/pagination.interface'
import { IProduct } from '@/types/product.interface'

interface IProps {
	initialProducts: IPaginationResponse<IProduct>
}

export default function Home({ initialProducts }: IProps) {
	const { products, isHasMore, isLoading, totalCount, data } =
		useManageProducts(initialProducts)

	const { isRolledUp } = useSidebarStore()
	const { updateQueryParams, queryParams, isFilterUpdated } = useFilters()

	useEffect(() => {
		updateQueryParams('page', '1')
	}, [queryParams.sort])

	return (
		<section>
			<CatalogNav initialProducts={initialProducts} />
			<div
				className={cn('grid gap-6', {
					'grid-cols-[1fr_3.5fr]': isRolledUp
				})}
			>
				{isRolledUp && (
					<aside className={cn('border-slate-300 rounded-br-lg bg-white z-20')}>
						<div className='sticky top-0 left-0'>Filters </div>
					</aside>
				)}
				<Catalog products={products || []} isLoading={isLoading} />
			</div>
			<Pagination
				numberPages={totalCount / +queryParams.perPage}
				currentPage={queryParams.page?.toString()}
				changePage={page => updateQueryParams('page', page.toString())}
			/>
		</section>
	)
}
