import Home from '@/screens/home/Home'
import { ProductService } from '@/services/product/product.service'
import { TypePaginationProduct } from '@/types/product.type'
import { GetStaticProps, Metadata, NextPage } from 'next'

export const metaData: Metadata = {
	title: 'Home',
	description:
		'Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime.'
}

const HomePage: NextPage<TypePaginationProduct> = ({ products, length }) => {
	return <Home products={products} length={length} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProduct
> = async () => {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 4
	})

	return { props: data }
}

export default HomePage
