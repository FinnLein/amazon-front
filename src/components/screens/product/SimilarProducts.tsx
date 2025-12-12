import Heading from '@/ui/Heading'
import { ProductItem } from '@/ui/catalog/product-item/ProductItem'

import { IProduct } from '@/types/product.interface'

export function SimilarProducts({
	similarProducts
}: {
	similarProducts: IProduct[]
}) {
	return (
		<div className='mt-20'>
			<Heading className='mb-7'>Similar products:</Heading>
			{similarProducts.length ? (
				<div className='flex flex-wrap gap-10'>
					{similarProducts.map(product => (
						<ProductItem
							product={product}
							index={product.id}
							key={product.id}
						/> 
					))}
				</div>
			) : (
				<div>There are no products</div> 
			)}
		</div>
	)
}
