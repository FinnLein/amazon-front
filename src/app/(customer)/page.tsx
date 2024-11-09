import Home from '@/screens/home/Home'
import { ProductService } from '@/services/product/product.service'
import {
	IProductDataFilters,
	TSearchParams
} from '@/services/product/product.types'

export const revalidate = 60

async function getProducts(searchParams: IProductDataFilters) {
	const data = await ProductService.getAll({
		...searchParams,
		perPage: searchParams.perPage || 4
	})

	return data
}

export default async function HomePage({ searchParams }: TSearchParams) {
	const data = await getProducts(searchParams)

	console.log(data)

	return <Home initialProducts={data} />
}
