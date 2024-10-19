'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import Heading from '@/ui/Heading'
import ShowMore from '@/ui/ShowMore'
import DashboardTable from '@/ui/admin/table/DashboardTable'
import { IDashboardTableBaseData } from '@/ui/admin/table/dashbord-table.type'
import Field from '@/ui/input/Field'
import SortDropdown from '@/ui/select/SortDropdown'

import { useManageProducts } from '@/hooks/useProducts'

import { TProduct } from '@/types/product.type'

import { ManagersTransitions, ManagersVariants } from '../../ManagersVariants'

import { SERVER_URL } from '@/constants/main.constants'

interface IProductsTable
	extends Pick<TProduct, 'id' | 'category' | 'images' | 'name' | 'price'>,
		IDashboardTableBaseData {}

export function ManageProducts() {
	const {
		products,
		deleteProduct,
		isHasMore,
		isLoading,
		setPage,
		searchTerm,
		setSearchTerm,
		sortType,
		setSortType
	} = useManageProducts(10, false, false)

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
						href='/admin/product/create'
					>
						Create a new product
					</Link>
				</div>
				<div className='flex items-center gap-10'>
					<div>
						<Field
							placeholder='Search...'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</div>
					<div>
						<SortDropdown
							bg='dark'
							rounded='lg'
							setSortType={setSortType}
							sortType={sortType}
						/>
					</div>
				</div>
			</div>
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
								<Image
									alt=' '
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
						editUrl: `/admin/product/edit/${id}`,
						deleteHandler: () => deleteProduct(id)
					})) || []
				}
			/>

			{isHasMore && (
				<ShowMore
					isLoading={isLoading}
					onLoadMore={() => setPage(prev => prev + 1)}
					type='text'
				/>
			)}
		</m.div>
	)
}
