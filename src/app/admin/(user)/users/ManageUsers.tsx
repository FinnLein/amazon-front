'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

import Heading from '@/ui/Heading'
import ShowMore from '@/ui/ShowMore'
import DashboardTable from '@/ui/admin/table/DashboardTable'
import { IDashboardTableBaseData } from '@/ui/admin/table/dashbord-table.type'
import Field from '@/ui/input/Field'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { useProfile } from '@/hooks/useProfile'

import { IUser } from '@/types/user.interface'

import { ManagersTransitions, ManagersVariants } from '../../ManagersVariants'

import { useManageUsers } from './useManageUsers'
import { SERVER_URL } from '@/constants/main.constants'

interface IUsersTable
	extends Pick<IUser, 'id' | 'email' | 'rights' | 'avatarPath' | 'name'>,
		IDashboardTableBaseData {}

export function ManageUsers() {
	const {
		isPending,
		users,
		deleteUser,
		setPage,
		searchTerm,
		setSearchTerm,
		isHasMore
	} = useManageUsers()

	const { user } = useProfile()

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
			{isPending ? (
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
			{isHasMore && (
				<ShowMore
					type='text'
					isLoading={isPending}
					onLoadMore={() => setPage(prev => prev + 1)}
				/>
			)}
		</m.div>
	)
}
