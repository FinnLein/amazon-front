'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import Heading from '@/ui/Heading'
import { useFilters } from '@/ui/filters/useFilters'
import Field from '@/ui/input/Field'
import { Pagination } from '@/ui/pagination/Pagination'
import { SortDropdown } from '@/ui/sort/SortDropdown'
import DashboardTable from '@/ui/table/DashboardTable'
import { IDashboardTableBaseData } from '@/ui/table/dashbord-table.type'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { useDebounce } from '@/hooks/useDebounce'
import { useManageProducts } from '@/hooks/useProducts'

import { IPaginationResponse } from '@/types/pagination.interface'
import { IProduct } from '@/types/product.interface'

import {
	ManagersTransitions,
	ManagersVariants
} from '../../../../app/admin/ManagersVariants'

import { SERVER_URL } from '@/constants/main.constants'

interface IProductsTable
	extends Pick<IProduct, 'id' | 'category' | 'images' | 'name' | 'price'>,
		IDashboardTableBaseData {}

export function ManageProducts({
	initialProducts
}: {
	initialProducts?: IPaginationResponse<IProduct>
}) {
	const { products, deleteProduct, totalCount, isLoading } =
		useManageProducts(initialProducts)
	const { updateQueryParams, queryParams } = useFilters()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debounceSearchTerm = useDebounce(searchTerm, 500)

	useEffect(() => {
		updateQueryParams('searchTerm', debounceSearchTerm)
	}, [debounceSearchTerm])

	return (
		<m.div
			variants={ManagersVariants}
			initial='initial'
			animate='animate'
			transition={ManagersTransitions}
		>
			<div className='flex justify-between'>
				<div>
					<Heading>Products</Heading>
					<Link
						className='my-5 block hover:text-green-200'
						href={ADMIN_PAGES.CREATE_PRODUCT}
					>
						Create a new product
					</Link>
				</div>
				<div className='flex items-center gap-10'>
					<Field
						placeholder='Search...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<SortDropdown bg='dark' />
				</div>
			</div>
			{isLoading ? (
				<Skeleton />
			) : (
				<>
					<DashboardTable<IProductsTable>
						headerActions={['Edit', 'Delete']}
						columns={[
							{
								title: 'Id',
								dataIndex: 'id',
								render: record => record.id
							},
							{
								title: 'Name',
								dataIndex: 'name',
								render: record => record.name
							},

							{
								title: 'Image',
								dataIndex: 'images',
								render: record =>
									record.images && (
										<img
											alt=''
											width={50}
											height={50}
											src={
												record.images[0].includes('http')
													? record.images[0]
													: SERVER_URL + record.images[0]
											}
										/>
									)
							},
							{
								title: 'Category',
								dataIndex: 'category',
								//@ts-ignore
								render: record => record.category.name
							},
							{
								title: 'Price',
								dataIndex: 'price',
								render: record => record.price
							}
						]}
						data={
							products?.map(({ id, ...product }) => ({
								id,
								category: product.category,
								price: product.price,
								images: product.images,
								name: product.name,
								editUrl: `${ADMIN_PAGES.EDIT_PRODUCT}/${id}`,
								deleteHandler: () => deleteProduct(id)
							})) || []
						}
					/>

					<Pagination
						numberPages={(totalCount as number) / +queryParams.perPage}
						currentPage={queryParams.page?.toString()}
						changePage={page => updateQueryParams('page', page.toString())}
					/>
				</>
			)}
		</m.div>
	)
}
