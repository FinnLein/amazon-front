'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import Heading from '@/ui/Heading'
import ShowMore from '@/ui/ShowMore'
import DashboardTable from '@/ui/admin/table/DashboardTable'
import { IDashboardTableBaseData } from '@/ui/admin/table/dashbord-table.type'
import Field from '@/ui/input/Field'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { IBrand } from '@/types/brand.interface'

import { ManagersTransitions, ManagersVariants } from '../../ManagersVariants'

import { useManageBrands } from './useManageBrands'

interface IBrandTable
	extends Omit<IBrand, 'description'>,
		IDashboardTableBaseData {}

function ManageBrands() {
	const {
		searchTerm,
		setSearchTerm,
		isLoading,
		brands,
		isHasMore,
		setPage,
		deleteBrand
	} = useManageBrands(8)

	return (
		<m.div
			variants={ManagersVariants}
			initial='initial'
			animate='animate'
			transition={ManagersTransitions}
		>
			<div className='flex justify-between items-center'>
				<div>
					<Heading>brands</Heading>
					<Link
						className='my-5 block hover:text-green-200'
						href={ADMIN_PAGES.CREATE_BRAND}
					>
						Create a new Brand
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
				<DashboardTable<IBrandTable>
					headerActions={['Edit', 'Delete']}
					columns={[
						{ title: 'ID', dataIndex: 'id', render: r => r.id },
						{ title: 'Name', dataIndex: 'name', render: r => r.name }
					]}
					data={
						brands?.map(({ id, ...c }) => ({
							id,
							name: c.name,
							slug: c.slug,
							editUrl: `${ADMIN_PAGES.EDIT_BRAND}/${id}`,
							deleteHandler: () => deleteBrand(+id)
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

export default ManageBrands
