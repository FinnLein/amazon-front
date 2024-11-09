import cn from 'clsx'
import { m } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IBrand } from '@/types/brand.interface'

export default function BrandsMenu({ brands }: { brands: IBrand[] }) {
	const pathName = usePathname()

	return (
		<div>
			<div className='text-xl  text-white '>Brands: </div>
			<ul>
				{brands?.map(brand => (
					<m.li
						transition={{ ease: 'easeInOut' }}
						whileHover={{ scale: 1.05 }}
						key={brand.id}
					>
						<Link
							className={cn(
								'block text-lg my-3 hover:text-primary transition-colors duration-200 ',
								pathName === `/brand/${brand.slug}`
									? 'text-primary'
									: 'text-white'
							)}
							href={`/brand/${brand.slug}`}
						>
							{brand.name}
						</Link>
					</m.li>
				))}
			</ul>
		</div>
	)
}
