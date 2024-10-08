'use client'

import { SERVER_URL } from '@/constants/main.constants'
import { useProfile } from '@/hooks/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()

	return (
		<Link href={'/profile'}>
			{profile?.avatarPath && (
				<Image
					width={43}
					height={43}
					src={profile?.avatarPath.includes('http')
						? profile?.avatarPath
						: SERVER_URL  + profile?.avatarPath}
					alt='profile'
					className='rounded-full border-primary border border-solid animate-opacity'
				/>
			)}
		</Link>
	)
}

export default HeaderProfile
