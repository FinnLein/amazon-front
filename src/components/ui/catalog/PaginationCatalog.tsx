import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/productSort.enum'
import { TypePaginationProduct } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import Button from '../button/Button'
import Heading from '../Heading'
import Select from '../select/Select'
import ProductItem from './product-item/ProductItem'

interface IPaginationCatalog {
	data: TypePaginationProduct
	title?: string
}

const PaginationCatalog: FC<IPaginationCatalog> = ({ data, title }) => {
	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.HIGH_PRICE
	)

	const [page, setPage] = useState(1)

	const { data: response, isLoading: isLoadingQuery } = useQuery({
		queryKey: ['products'],
		queryFn: () => ProductService.getAll({ page, perPage: 4, sort: sortType }),
		initialData: data
	})

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}

			<div className='flex justify-end'>
				<Select sortType={sortType} setSortType={setSortType} />
			</div>
			{response.products.length ? (
				<>
					<div className='grid grid-cols-4 gap-10	'>
						{response.products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
					<div className='text-center mt-16'>
						<Button
							onClick={() => setPage(page + 1)}
							size='md'
							variant='orange'
						>
							Load more
						</Button>
					</div>
				</>
			) : (
				<div>There are no products</div>
			)}
		</section>
	)
}

export default PaginationCatalog
