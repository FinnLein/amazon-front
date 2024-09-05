import { CategoryService } from '@/services/category/category.service'
import { ProductService } from '@/services/product/product.service'
import { TCategory } from '@/types/category.type'
import { TProduct } from '@/types/product.type'
import Catalog from '@/ui/catalog/Catalog'
import Heading from '@/ui/Heading'
import Layout from '@/ui/layout/Layout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const CategoryPage: NextPage<{
	products: TProduct[]
	category: TCategory
}> = ({ products, category }) => {
	return (
		<>
			<Layout>
				<Catalog products={products || []} title={category.name} />
			</Layout>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const categories = await CategoryService.getAll()

	const paths = categories.data.map(category => {
		return {
			params: { slug: category.slug }
		}
	})

	return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: products } = await ProductService.getByCategory(
		params?.slug as string
	)

	const { data: category } = await CategoryService.getBySlug(
		params?.slug as string
	)

	return {
		props: {
			products,
			category
		}
	}
}

export default CategoryPage
