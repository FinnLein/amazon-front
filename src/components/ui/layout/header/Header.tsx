'use client'

import cn from 'clsx'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

import { useProfileQueries } from '@/ui/fields/profile-form/useProfileQueries'

import { UserRole } from '@/types/user.type'

import HeaderProfile from './HeaderProfile'
import Logo from './Logo'
import Search from './Search'
import HeaderCart from './cart/HeaderCart'

interface Props {
	className?: string
}

const Header: FC<Props> = ({ className }) => {
	const { data } = useProfileQueries()

	return (
		<header
			className={cn('bg-secondary w-full py-6 px-6 grid', className)}
			style={{ gridTemplateColumns: '1fr 3fr 1.2fr' }}
		>
			<Logo />
			<Search />
			<div className='flex items-center justify-end gap-10'>
				{data?.role === UserRole.Admin ? (
					<Link href='/admin' className='text-white'>
						<Shield size={28} />{' '}
					</Link>
				) : null}

				<Link href='/favorites' className='text-white'>
					<AiOutlineHeart size={28} />
				</Link>
				<HeaderCart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
