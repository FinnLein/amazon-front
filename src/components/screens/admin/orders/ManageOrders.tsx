'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import Heading from '@/ui/Heading'
import { useFilters } from '@/ui/filters/useFilters'
import Field from '@/ui/input/Field'
import { Pagination } from '@/ui/pagination/Pagination'
import DashboardTable from '@/ui/table/DashboardTable'
import { IDashboardTableBaseData } from '@/ui/table/dashbord-table.type'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { useDebounce } from '@/hooks/useDebounce'

import { IOrder } from '@/types/order.interface'

import { formatDate } from '@/utils/date/formatDate'

import {
	ManagersTransitions,
	ManagersVariants
} from '../../../../app/admin/ManagersVariants'

import { useManageOrders } from './useManageOrders'
import { SERVER_URL } from '@/constants/main.constants'

interface IOrderTable extends IOrder, IDashboardTableBaseData {}

export function ManageOrders() {
	const { isLoading, orders, deleteOrder, totalCount } = useManageOrders()
	const { updateQueryParams, queryParams } = useFilters()
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
					<Heading>Orders</Heading>
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
				<>
					<DashboardTable<IOrderTable>
						headerActions={['View', 'Delete']}
						columns={[
							{ title: 'ID', dataIndex: 'id', render: r => r.id },
							{
								title: 'Order',
								dataIndex: 'items',
								render: r => (
									<div className='flex flex-wrap gap-5'>
										{r.items.map(p => (
											<Image
												width={50}
												height={50}
												alt='Product'
												src={
													p.product.images[0].includes('http')
														? p.product.images[0]
														: SERVER_URL + p.product.images[0]
												}
											/>
										))}
									</div>
								)
							},
							{ title: 'Rating', dataIndex: 'status', render: r => r.status },
							{
								title: 'Created at',
								dataIndex: 'createdAt',
								render: r => r.createdAt
							}
						]}
						data={
							orders?.map(({ id, ...r }) => ({
								id,
								status: r.status,
								items: r.items,
								total: r.total,
								createdAt: formatDate(r.createdAt),
								userId: r.userId,
								viewUrl: `${ADMIN_PAGES.ORDER}/${id}`,
								deleteHandler: () => deleteOrder(+id)
							})) || []
						}
					/>
					<Pagination
						currentPage={queryParams.page?.toString()}
						numberPages={(totalCount as number) / +queryParams.perPage}
						changePage={page => updateQueryParams('page', page)}
					/>
				</>
			)}
		</m.div>
	)
}
