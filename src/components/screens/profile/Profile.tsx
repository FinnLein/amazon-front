'use client'

import Link from 'next/link'

import { ProfileForm } from '@/ui/fields/profile-form/ProfileForm'
import Logout from '@/ui/logout/Logout'
import Modal from '@/ui/modal/Modal'

import { useModalStore } from '@/store/modal/modalStore'

import { useProfile } from '@/hooks/useProfile'

import RecentOrders from './RecentOrders'
import { SERVER_URL } from '@/constants/main.constants'

export default function Profile() {
	const {
		user: { avatarPath, name, email, phone, rights, id }
	} = useProfile()

	const { isActive, setIsActive } = useModalStore()

	return (
		<section className='bg-white p-14 rounded-lg '>
			<div
				className='inline-grid grid-cols-3 gap-32 pb-10'
				style={{ gridTemplateColumns: '.8fr 1fr 1fr' }}
			>
				<div className='rounded-full overflow-hidden relative hover:dark:bg-black-500 cursor-pointer'>
					<img
						src={
							(avatarPath || '').includes('http')
								? avatarPath
								: SERVER_URL + avatarPath
						}
						alt='Profile photo'
						width={250}
						height={250}
						onClick={() => setIsActive(true)}
					/>

					<Modal isActive={isActive} setIsActive={setIsActive}>
						<ProfileForm type='update-profile' />
					</Modal>
				</div>
				<div>
					<div>{name}</div>
					<div>{email}</div>
					<div>{phone}</div>
					<span className='flex flex-col'>{rights?.join(',  ')}</span>
				</div>
				<div>
					<div>
						<Link href={'/my-orders'}>My orders</Link>
					</div>
				</div>
			</div>
			<RecentOrders />
			<div className='flex justify-end'>
				<div>{id && <Logout color='black' />}</div>
			</div>
		</section>
	)
}
