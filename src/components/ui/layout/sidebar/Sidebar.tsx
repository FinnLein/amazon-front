'use client'

import cn from 'clsx'
import { m } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { Loader } from '@/ui/Loader'

import { useManageCategories } from '@/app/admin/(category)/categories/useManageCategories'

const Sidebar: FC = () => {
	const { categories, isLoading } = useManageCategories(100)

	const pathName = usePathname()

	return (
		<aside className='relative bg-secondary  flex flex-col justify-between'>
			{isLoading ? (
				<Loader className='flex justify-center' />
			) : categories ? (
				<div className='mb-20'>
					<div className='text-xl  text-white mt-4 mb-6 ml-6'>Categories: </div>
					<ul>
						{categories?.map(category => (
							<m.li
								transition={{ ease: 'easeInOut' }}
								whileHover={{ scale: 1.05 }}
								key={category.id}
							>
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
							</m.li>
						))}
					</ul>
				</div>
			) : (
				<div>Categories not found</div>
			)}
		</aside>
	)
}

export default Sidebar
