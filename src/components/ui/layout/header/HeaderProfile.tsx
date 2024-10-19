'use client'

import { UserPen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'

import { SERVER_URL } from '@/constants/main.constants'

const HeaderProfile: FC = () => {
	const { user } = useProfile()

	return (
		<Link href={'/profile'}>
			{user?.avatarPath ? (
				<Image
					width={43}
					height={43}
					src={
						user?.avatarPath.includes('http')
							? user?.avatarPath
							: SERVER_URL + user?.avatarPath
					}
					alt='data'
					className='rounded-full border-primary border border-solid animate-opacity'
				/>
			) : (
				<UserPen size={28} color='white' />
			)}
		</Link>
	)
}

export default HeaderProfile
