'use client'

import { m } from 'framer-motion'

import { IProduct } from '@/types/product.interface'

import { Loader } from '../Loader'
import { itemVariants } from '../admin/statistics/users/user-statistics-animation'

import ProductItem from './product-item/ProductItem'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
}

export default function Catalog({ products, isLoading }: ICatalog) {
	if (isLoading) return <Loader className='flex justify-center mt-10' />

	return (
		<section>
			{products?.length ? (
				<div className='grid justify-center grid-cols-auto-fill-300 gap-6 pt-8'>
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
		</section>
	)
}
