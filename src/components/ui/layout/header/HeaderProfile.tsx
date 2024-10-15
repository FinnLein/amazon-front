'use client'

import { SERVER_URL } from '@/constants/main.constants'
import { useProfileQueries } from '@/ui/fields/profile-form/useProfileQueries'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const HeaderProfile: FC = () => {
	const { data } = useProfileQueries()

	return (
		<Link href={'/profile'}>
			{data?.avatarPath && (
				<Image
					width={43}
					height={43}
					src={
						data?.avatarPath.includes('http')
							? data?.avatarPath
							: SERVER_URL + data?.avatarPath
					}
					alt='data'
					className='rounded-full border-primary border border-solid animate-opacity'
				/>
			)}
		</Link>
	)
}

export default HeaderProfile
