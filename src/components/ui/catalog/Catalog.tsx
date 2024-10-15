import { TProduct } from '@/types/product.type'
import { FC } from 'react'
import Heading from '../Heading'
import { Loader } from '../Loader'
import ProductItem from './product-item/ProductItem'

interface ICatalog {
	products: TProduct[]
	isLoading?: boolean
	title?: string
	isPagination?: boolean
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
	if (isLoading) return <Loader />

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}
			{products?.length ? (
				<div className='flex gap-5 items-center'>
					<div
						className='grid grid-cols-4 gap-10	'
					>
						{products.map((product, index) => (
							<ProductItem index={index} key={product.id} product={product} />
						))}
					</div>
				</div>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
