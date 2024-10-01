import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import HeaderCart from './cart/HeaderCart'
import HeaderProfile from './HeaderProfile'
import Logo from './Logo'
import Search from './Search'
import cn from 'clsx'
interface Props {
	className?: string
}

const Header: FC<Props> = ({ className }) => {
	return (
		<header
			className={cn('bg-secondary w-full py-6 px-6 grid', className)}
			style={{ gridTemplateColumns: '1fr 3fr 1.2fr' }}
		>
			<Logo />
			<Search />
			<div className='flex items-center justify-end gap-10'>
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
