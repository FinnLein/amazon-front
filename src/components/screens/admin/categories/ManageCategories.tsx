'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import Heading from '@/ui/Heading'
import { useFilters } from '@/ui/filters/useFilters'
import Field from '@/ui/input/Field'
import DashboardTable from '@/ui/table/DashboardTable'
import { IDashboardTableBaseData } from '@/ui/table/dashbord-table.type'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { useDebounce } from '@/hooks/useDebounce'

import { ICategory } from '@/types/category.interface'


import {
	ManagersTransitions,
	ManagersVariants
} from '../../../../app/admin/ManagersVariants'
import { useManageCategories } from './useManageCategories'

interface ICategoryTable
	extends Omit<ICategory, 'description'>,
		IDashboardTableBaseData {}

function ManageCategories() {
	const { isLoading, categories, deleteCategory } = useManageCategories()

	const { updateQueryParams } = useFilters()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	useEffect(() => {
		updateQueryParams('searchTerm', debouncedSearchTerm)
	}, [debouncedSearchTerm])

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
						href={ADMIN_PAGES.CREATE_CATEGORY}
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
							editUrl: `${ADMIN_PAGES.EDIT_CATEGORY}/${id}`,
							deleteHandler: () => deleteCategory(+id)
						})) || []
					}
				/>
			)}
		</m.div>
	)
}

export default ManageCategories
