import cn from 'clsx'
import { m } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ICategory } from '@/types/category.interface'

export default function CategoriesMenu({
	categories
}: {
	categories: ICategory[]
}) {
	const pathName = usePathname()

	return (
		<div>
			<div className='text-xl text-white'>Categories: </div>
			<ul>
				{categories?.map(category => (
					<m.li
						transition={{ ease: 'easeInOut' }}
						whileHover={{ scale: 1.05 }}
						key={category.id}
					>
						<Link
							className={cn(
								'block text-lg my-3 hover:text-primary transition-colors duration-200 ',
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
	)
}
