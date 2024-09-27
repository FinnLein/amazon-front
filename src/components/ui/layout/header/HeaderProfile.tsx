'use client'

import { useProfile } from '@/hooks/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()

	return (
		<Link href={'/my-orders'}>
			{profile?.avatarPath && (
				<Image
					width={43}
					height={43}
					src={profile?.avatarPath}
					alt='profile'
					className='rounded-full border-primary border border-solid animate-opacity'
				/>
			)}
		</Link>
	)
}

export default HeaderProfile
