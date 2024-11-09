'use client'

import cn from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import { UserPen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import Logout from '@/ui/logout/Logout'

import { PUBLIC_PAGES } from '@/config/pages/public.config'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import { xSlideAnimations } from '@/utils/animations.ts/animations.data'

import { HeaderData } from './header.data'
import { SERVER_URL } from '@/constants/main.constants'

const HeaderProfile: FC = () => {
	const {
		user: { avatarPath, isLoggedIn }
	} = useProfile()
	const { setIsShow, isShow, ref } = useOutside(false)
	const pathName = usePathname()
	return (
		<div className='relative ' ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				{avatarPath ? (
					<Image
						width={43}
						height={43}
						src={
							avatarPath.includes('http') ? avatarPath : SERVER_URL + avatarPath
						}
						alt='avatar'
						className='rounded-full border-primary border border-solid animate-opacity'
					/>
				) : (
					<UserPen size={28} color='white' />
				)}
			</button>

			<AnimatePresence>
				{isShow && (
					<m.div
						variants={xSlideAnimations}
						initial='initial'
						animate='animate'
						exit={{ x: 400, opacity: 0 }}
						transition={{ ease: 'easeInOut', duration: 0.5 }}
						style={{ top: 'calc(100%) + 1rem' }}
						className='absolute right-0 z-50 text-white  bg-secondary w-40 rounded-xl'
					>
						<div className='flex flex-col gap-2 py-3 px-4 '>
							{isLoggedIn ? (
								HeaderData.map(d => (
									<m.div
										key={d.name}
										transition={{ ease: 'easeInOut' }}
										whileHover={{ scale: 1.05 }}
									>
										<Link
											className={cn(
												'transition-colors ease-in-out duration-200 hover:text-primary',
												pathName === d.url ? 'text-primary' : 'text-white'
											)}
											href={d.url}
										>
											{d.name}
										</Link>
									</m.div>
								))
							) : (
								<Link
									className={cn(
										'transition-colors ease-in-out duration-200 hover:text-primary'
									)}
									href={PUBLIC_PAGES.LOGIN}
								>
									Login
								</Link>
							)}
						</div>
						{isLoggedIn && <Logout className='px-2 my-3 hover:text-red' />}
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default HeaderProfile
