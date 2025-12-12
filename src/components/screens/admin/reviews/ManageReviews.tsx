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

import { IReview } from '@/types/review.interface'

import { formatDate } from '@/utils/date/formatDate'
import { truncateText } from '@/utils/strings/truncateText'


import {
	ManagersTransitions,
	ManagersVariants
} from '../../../../app/admin/ManagersVariants'

import { SERVER_URL } from '@/constants/main.constants'
import { useManageReviews } from './useManageReviews'

interface IReviewTable
	extends Omit<IReview, 'description'>,
		IDashboardTableBaseData {}

export function ManageReviews() {
	const { isLoading, reviews, deleteReview, totalCount } = useManageReviews()
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
					<Heading>Reviews</Heading>
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
					<DashboardTable<IReviewTable>
						headerActions={['View', 'Delete']}
						columns={[
							{ title: 'ID', dataIndex: 'id', render: r => r.id },
							{ title: 'Review', dataIndex: 'text', render: r => r.text },
							{ title: 'Rating', dataIndex: 'rating', render: r => r.rating },
							{
								title: 'User',
								dataIndex: 'user',
								render: r => (
									<Image
										width={50}
										height={50}
										alt='User'
										src={
											r.user.avatarPath.includes('http')
												? r.user.avatarPath
												: SERVER_URL + r.user.avatarPath
										}
									/>
								)
							},
							{
								title: 'Created at',
								dataIndex: 'createdAt',
								render: r => r.createdAt
							}
						]}
						data={
							reviews?.map(({ id, ...r }) => ({
								id,
								text: truncateText(r.text, 50),
								rating: r.rating,
								createdAt: formatDate(r.createdAt),
								user: r.user,
								viewUrl: `${ADMIN_PAGES.REVIEW}/${id}`,
								deleteHandler: () => deleteReview(+id)
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
