'use client'

import cn from 'clsx'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

import { useProfile } from '@/hooks/useProfile'

import HeaderProfile from './HeaderProfile'
import Logo from './Logo'
import Search from './Search'
import HeaderCart from './cart/HeaderCart'

interface Props {
	className?: string
}

const Header: FC<Props> = ({ className }) => {
	const {
		user: { isAdmin, favorites }
	} = useProfile()

	return (
		<header
			className={cn('bg-secondary w-full py-6 px-6 grid', className)}
			style={{ gridTemplateColumns: '1fr 3fr 1.2fr' }}
		>
			<Logo />
			<Search />
			<div className='flex items-center justify-end gap-10'>
				{isAdmin && (
					<Link href='/admin' className='text-white'>
						<Shield size={28} />{' '}
					</Link>
				)}

				<Link href='/favorites' className='text-white relative'>
					{!!favorites?.length && (
						<span className='flex h-4 w-4 items-center justify-center rounded-full bg-white p-0.5 text-[0.75rem] text-secondary absolute -top-1 -right-1'>
							{favorites?.length}
						</span>
					)}
					<AiOutlineHeart size={28} />
				</Link>
				<HeaderCart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
