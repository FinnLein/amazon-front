'use client'

import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { Loader } from '@/ui/Loader'
import Logout from '@/ui/logout/Logout'

import { useProfile } from '@/hooks/useProfile'

import { useManageCategories } from '@/app/admin/(category)/categories/useManageCategories'

const Sidebar: FC = () => {
	const { categories, isLoading } = useManageCategories(100)
	const { user } = useProfile()

	const pathName = usePathname()

	return (
		<aside className='relative bg-secondary  flex flex-col justify-between'>
			{isLoading ? (
				<Loader />
			) : categories ? (
				<div className='mb-20'>
					<div className='text-xl  text-white mt-4 mb-6 ml-6'>Categories: </div>
					<ul>
						{categories?.map(category => (
							<li key={category.id}>
								<Link
									className={cn(
										'block text-lg my-3 px-10 hover:text-primary transition-colors duration-200 ',
										pathName === `/category/${category.slug}`
											? 'text-primary'
											: 'text-white'
									)}
									href={`/category/${category.slug}`}
								>
									{category.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div>Categories not found</div>
			)}
			{user.id && (
				<div>{pathName === '/profile' ? null : <Logout color='white' />}</div>
			)}
		</aside>
	)
}

export default Sidebar
