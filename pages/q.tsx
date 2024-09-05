import { ProductService } from '@/services/product/product.service'
import Catalog from '@/ui/catalog/Catalog'
import Layout from '@/ui/layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const SearchPage: NextPage = () => {
	const { query } = useRouter()

	const { data } = useQuery({
		queryKey: ['search products', query.term],
		queryFn: () => ProductService.getAll({ searchTerm: query.term as string })
	})

	return (
		<>
			<Layout>
				<Catalog
					products={data?.products || []}
					title={`Поиск по запросу ${query.term || ''}`}
				/>
			</Layout>
		</>
	)
}

export default SearchPage
