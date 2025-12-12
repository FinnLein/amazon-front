'use client'

import cn from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Shield } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

import CatalogMenu from '@/ui/catalog-menu/CatalogMenu'

import { useOutside } from '@/hooks/useOutside'
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

	const { ref, isShow, setIsShow } = useOutside(false)
	return (
		<header
			className={cn(
				'bg-secondary w-full p-6 grid grid-cols-3 gap-10 items-center sticky top-0 z-50',
				className
			)}
			style={{ gridTemplateColumns: '1.5fr 3fr 1.5fr' }}
		>
			<div className='bg-primary relative text-white rounded-xl px-2 py-4 flex gap-3 items-center'>
				<Logo />
				<div
					className='p-2  bg-primary hover:brightness-110 rounded-lg'
					ref={ref}
				>
					<button
						className='flex items-center gap-1'
						onClick={() => setIsShow(!isShow)}
					>
						<span>Catalog</span>
						<span>{isShow ? <ChevronUp /> : <ChevronDown />}</span>
					</button>
				</div>
				<AnimatePresence>{isShow && <CatalogMenu />}</AnimatePresence>
			</div>
			<Search />
			<div className='flex p-4 rounded-lg items-center justify-evenly gap-10'>
				{isAdmin && (
					<Link href='/admin' className='text-white'>
						<Shield size={28} />{' '}
					</Link>
				)}
				<Link
					href='/favorites'
					className='text-white relative hover:text-pink-700 transition-colors duration-200'
				>
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
