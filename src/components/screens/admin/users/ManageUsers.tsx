'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
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
import { useProfile } from '@/hooks/useProfile'

import { IUser } from '@/types/user.interface'

import {
	ManagersTransitions,
	ManagersVariants
} from '../../../../app/admin/ManagersVariants'

import { useManageUsers } from './useManageUsers'
import { SERVER_URL } from '@/constants/main.constants'

interface IUsersTable
	extends Pick<IUser, 'id' | 'email' | 'rights' | 'avatarPath' | 'name'>,
		IDashboardTableBaseData {}

export function ManageUsers() {
	const { users, deleteUser, isLoading, totalCount } = useManageUsers()

	const { updateQueryParams, queryParams } = useFilters()
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debounceSearchTerm = useDebounce(searchTerm, 500)
	const { user } = useProfile()

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
			<div className='flex justify-between items-center'>
				<div>
					<Heading>Users</Heading>
					<Link
						href={ADMIN_PAGES.CREATE_USER}
						className='my-5 block hover:text-green-200'
					>
						Create a new user
					</Link>
				</div>
				<div>
					<Field
						value={searchTerm}
						placeholder='Search term...'
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			{isLoading ? (
				<Skeleton count={4} />
			) : (
				<DashboardTable<IUsersTable>
					headerActions={['Edit', 'Delete']}
					columns={[
						{
							title: 'ID',
							dataIndex: 'id',
							render: record => record.id
						},
						{
							title: 'AVATAR',
							dataIndex: 'avatarPath',
							render: record =>
								record.avatarPath && (
									<Image
										alt=''
										src={
											record.avatarPath.includes('http')
												? record.avatarPath
												: SERVER_URL + record.avatarPath
										}
										width={50}
										height={50}
									/>
								)
						},
						{
							title: 'Name',
							dataIndex: 'name',
							render: record => record.name
						},
						{
							title: 'Email',
							dataIndex: 'email',
							render: record => record.email
						},
						{
							title: 'Rights',
							dataIndex: 'rights',
							render: record => record.rights
						}
					]}
					//@ts-ignore
					data={
						users
							?.filter(u => u.id !== user?.id)
							?.map(({ id, ...user }) => ({
								id,
								avatarPath: user.avatarPath,
								email: user.email,
								rights: user.rights.join(', '),
								name: user.name,
								editUrl: `${ADMIN_PAGES.EDIT_USER}/${id}`,
								deleteHandler: () => deleteUser(id)
							})) || []
					}
				/>
			)}
			{!isLoading && users && (totalCount as number) > queryParams.perPage && (
				<Pagination
					currentPage={queryParams.page?.toString()}
					numberPages={(totalCount as number) / queryParams.perPage}
					changePage={page => updateQueryParams('page', page)}
				/>
			)}
		</m.div>
	)
}
