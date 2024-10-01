'use client'

import { SERVER_URL } from '@/constants/main.constants'
import { useProfile } from '@/hooks/useProfile'
import { TUser } from '@/types/user.type'
import DashboardTable from '@/ui/admin/table/DashboardTable'
import { IDashbordTableBaseData } from '@/ui/admin/table/dashbord-table.type'
import Heading from '@/ui/Heading'
import Field from '@/ui/input/Field'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import { ManageUsersShowMore } from './ManageUsersShowMore'
import { useManageUsers } from './useManageUsers'

interface IUsersTable
	extends Pick<TUser, 'id' | 'email' | 'role' | 'avatarPath' | 'name'>,
		IDashbordTableBaseData {}

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

	const { profile } = useProfile()

	return (
		<div className='mt-5'>
			<div className='flex justify-between items-center'>
				<div>
					<Heading>Users</Heading>
					<Link href={'/admin/users/create'} className='my-5 block'>
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
							render: record =>
								record.id === profile?.id ? (
									<div className='text-red'>I am</div>
								) : (
									record.id
								)
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
							title: 'Role',
							dataIndex: 'role',
							render: record => record.role
						}
					]}
					data={
						users?.map(({ id, ...user }) => ({
							id,
							avatarPath: user.avatarPath,
							email: user.email,
							role: user.role,
							name: user.name,
							editUrl: `/admin/users/edit/${id}`,
							deleteHandler: () => deleteUser(id)
						})) || []
					}
				/>
			)}
			{isHasMore && (
				<ManageUsersShowMore isLoading={isPending} setPage={setPage} />
			)}
		</div>
	)
}
