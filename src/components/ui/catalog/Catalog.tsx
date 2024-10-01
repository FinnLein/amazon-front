import { TProduct } from '@/types/product.type'
import { FC } from 'react'
import Heading from '../Heading'
import ProductItem from './product-item/ProductItem'
import { Loader } from '../Loader'

interface ICatalog {
	products: TProduct[]
	isLoading?: boolean
	title?: string
	isPagination?: boolean
}

const Catalog: FC<ICatalog> = ({
	products,
	isLoading,
	title,
	isPagination = false
}) => {
	if (isLoading) return <Loader />


	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}

			{products.length ? (
				<>
					<div className='grid grid-cols-4 gap-10	'>
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
					
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
