'use client'

import cn from 'clsx'
import { AnimatePresence, m } from 'framer-motion'

import Catalog from '@/ui/catalog/Catalog'
import { CatalogNav } from '@/ui/catalog/CatalogNav'
import { Filters } from '@/ui/filters/Filters'
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
	const { products, isLoading, totalCount } = useManageProducts(initialProducts)
	const { isRolledUp } = useSidebarStore()
	const { updateQueryParams, queryParams } = useFilters()

	return (
		<>
			<CatalogNav initialProducts={initialProducts} />
			<div className={'flex 100%'}>
				<AnimatePresence>
					{isRolledUp && (
						<m.div
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: '25%', opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							className='border-slate-300  border-r bg-white'
						>
							<aside className={cn('top-32  z-20')}>
								<Filters />
							</aside>
						</m.div>
					)}
				</AnimatePresence>
				<section
					className={cn('pb-32 pt-8 px-8 mx-auto', {
						'w-3/4': isRolledUp
					})}
				>
					<Catalog products={products || []} isLoading={isLoading} />
					{!isLoading && products && (
						<Pagination
							numberPages={(totalCount as number) / +queryParams.perPage}
							currentPage={queryParams.page?.toString()}
							changePage={page => updateQueryParams('page', page.toString())}
						/>
					)}
				</section>
			</div>
		</>
	)
}
