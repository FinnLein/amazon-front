'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ProfileForm } from '@/ui/fields/profile-form/ProfileForm'
import { useProfileQueries } from '@/ui/fields/profile-form/useProfileQueries'
import Logout from '@/ui/logout/Logout'
import Modal from '@/ui/modal/Modal'

import { useModalStore } from '@/store/modal/modalStore'
import { useUserStore } from '@/store/user/userStore'

import { UserRole } from '@/types/user.type'

import RecentOrders from './RecentOrders'
import { SERVER_URL } from '@/constants/main.constants'

export default function Profile() {
	const { user } = useUserStore()

	const { data } = useProfileQueries()

	const {isActive, setIsActive} = useModalStore()

	return (
		<section className='bg-white p-14 rounded-lg '>
			<div
				className='inline-grid grid-cols-3 gap-32 pb-10'
				style={{ gridTemplateColumns: '.8fr 1fr 1fr' }}
			>
				<div className='rounded-full overflow-hidden relative hover:shadow-lg cursor-pointer'>
					<img
						src={
							data?.avatarPath.includes('http')
								? data?.avatarPath
								: SERVER_URL + data?.avatarPath
						}
						alt='Profile photo'
						width={250}
						height={250}
						onClick={() => setIsActive(true)}
					/>
					<Modal isActive={isActive} setIsActive={setIsActive}>
						<ProfileForm type='update-profile' />
					</Modal>
					<div className='absolute z-10 flex justify-center items-center'>
						Change photo
					</div>
				</div>
				<div>
					<div>{data?.name}</div>
					<div>{data?.email}</div>
					<div>{data?.phone}</div>
					<div>{data?.role === UserRole.Admin ? data.role : null}</div>
				</div>
				<div>
					<div>
						<Link href={'/my-orders'}>My orders</Link>
					</div>
				</div>
			</div>
			<RecentOrders />
			<div className='flex justify-end'>
				<div>{!!user && <Logout color='black' />}</div>
			</div>
		</section>
	)
}
