'use client'

import cn from 'clsx'
import { m } from 'framer-motion'

import { useSidebarStore } from '@/store/sidebar/sidebarStore'

import { IProduct } from '@/types/product.interface'

import { itemVariants } from '../../screens/admin/statistics/users/user-statistics-animation'
import { Loader } from '../Loader'

import { ProductItem } from './product-item/ProductItem'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
}

export default function Catalog({ products, isLoading }: ICatalog) {
	if (isLoading) return <Loader className='grid justify-center mt-10' />

	const { isRolledUp } = useSidebarStore()

	return (
		<>
			{products?.length ? (
				<div
					className={cn(
						'grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2',
						{
							'lg:grid-cols-3 xl:grid-cols-3': isRolledUp
						}
					)}
				>
					{products.map((product, index) => (
						<m.div
							key={product.id}
							variants={itemVariants}
							initial='initial'
							whileInView='animate'
							transition={{ delay: 0.05 * index }}
						>
							<ProductItem index={index} product={product} />
						</m.div>
					))}
				</div>
			) : (
				<div className='flex justify-center'>There are no products</div>
			)}
		</>
	)
}
