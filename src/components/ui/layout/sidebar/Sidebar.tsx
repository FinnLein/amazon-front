'use client'

import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { useGetCategories } from '@/ui/layout/sidebar/useGetCategories'

import { useUserStore } from '@/store/user/userStore'
import { Loader } from '@/ui/Loader'
import Logout from '@/ui/logout/Logout'

const Sidebar: FC = () => {
	const { data, isLoading } = useGetCategories()

	const pathName = usePathname()
	const { user } = useUserStore()

	return (
		<aside className='relative bg-secondary  flex flex-col justify-between'>
			{isLoading ? (
				<Loader />
			) : data ? (
				<div className='mb-20'>
					<div className='text-xl  text-white mt-4 mb-6 ml-6'>Categories: </div>
					<ul>
						{data?.map(category => (
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
			{!!user && (
				<div>{pathName === '/profile' ? null : <Logout color='white' />}</div>
			)}
		</aside>
	)
}

export default Sidebar
