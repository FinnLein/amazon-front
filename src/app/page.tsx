import Home from '@/screens/home/Home'
import { ProductService } from '@/services/product/product.service'
import { TypePaginationProduct } from '@/types/product.type'
import { Metadata, NextPage } from 'next'

export const metaData: Metadata = {
	title: 'Home',
	description:
		'Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime.'
}

const HomePage: NextPage<TypePaginationProduct> = async ({ products, length }) => {
	const data = await getProducts()

	return <Home products={data.products} length={data.length} />
}

async function getProducts() {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 4
	})

	return data
}

export default HomePage
