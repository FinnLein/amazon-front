'use client'

import { SERVER_URL } from '@/constants/main.constants'
import { UserService } from '@/services/user/user.service'
import { useUserStore } from '@/store/user/userStore'
import { UserRole } from '@/types/user.type'
import Heading from '@/ui/Heading'
import Logout from '@/ui/logout/Logout'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

const Profile = () => {
	const { user } = useUserStore()

	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data
	})

	return (
		<>
			<Heading>My profile</Heading>

			<section>
				<div className='flex'>
					<div
						className='inline-grid grid-cols-3 gap-10'
						style={{ gridTemplateColumns: '.8fr 1fr 1fr' }}
					>
						<img
							src={
								data?.avatarPath.includes('http')
									? data?.avatarPath
									: SERVER_URL + data?.avatarPath
							}
							alt='Profile photo'
							width={250}
							height={250}
						/>
						<div>
							<div>{data?.name}</div>
							<div>{data?.role === UserRole.Admin ? data.role : null}</div>
						</div>
						<div>
							<Link href={'/my-orders'}>My orders</Link>
						</div>
					</div>
					<div>
						{data?.role === UserRole.Admin ? (
							<Link href={'/admin'}>Admin panel</Link>
						) : (
							<></>
						)}
					</div>
				</div>
				<div>{!!user && <Logout color='black' />}</div>
			</section>
		</>
	)
}

export default Profile
