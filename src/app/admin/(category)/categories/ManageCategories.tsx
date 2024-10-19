'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import Heading from '@/ui/Heading'
import ShowMore from '@/ui/ShowMore'
import DashboardTable from '@/ui/admin/table/DashboardTable'
import { IDashboardTableBaseData } from '@/ui/admin/table/dashbord-table.type'
import Field from '@/ui/input/Field'

import { TCategory } from '@/types/category.type'

import { ManagersTransitions, ManagersVariants } from '../../ManagersVariants'

import { useManageCategories } from './useManageCategories'

interface ICategoryTable
	extends Omit<TCategory, 'description'>,
		IDashboardTableBaseData {}

function ManageCategories() {
	const {
		searchTerm,
		setSearchTerm,
		isLoading,
		categories,
		isHasMore,
		setPage,
		deleteCategory
	} = useManageCategories(8)

	return (
		<m.div
			variants={ManagersVariants}
			initial='initial'
			animate='animate'
			transition={ManagersTransitions}
		>
			<div className='flex justify-between items-center'>
				<div>
					<Heading>Categories</Heading>
					<Link
						className='my-5 block hover:text-green-200'
						href={'/admin/category/create'}
					>
						Create a new category
					</Link>
				</div>
				<div>
					<Field
						color='black'
						value={searchTerm}
						placeholder='Search...'
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			{isLoading ? (
				<Skeleton />
			) : (
				<DashboardTable<ICategoryTable>
					headerActions={['Edit', 'Delete']}
					columns={[
						{ title: 'ID', dataIndex: 'id', render: r => r.id },
						{ title: 'Name', dataIndex: 'name', render: r => r.name }
					]}
					data={
						categories?.map(({ id, ...c }) => ({
							id,
							name: c.name,
							slug: c.slug,
							editUrl: `/admin/category/edit/${id}`,
							deleteHandler: () => deleteCategory(+id)
						})) || []
					}
				/>
			)}
			{isHasMore && (
				<ShowMore
					isLoading={isLoading}
					type='text'
					onLoadMore={() => setPage(prev => prev + 1)}
				/>
			)}
		</m.div>
	)
}

export default ManageCategories
