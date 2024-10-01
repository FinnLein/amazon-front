import { CategoryService } from '@/services/category/category.service'
import { ProductService } from '@/services/product/product.service'
import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'
import Catalog from '@/ui/catalog/Catalog'

export async function generateStaticParams() {
	const categories = await CategoryService.getAll()

	const paths = categories.data.map(category => {
		return {
			params: { slug: category.slug }
		}
	})

	return paths
}

async function getProducts(params: TypeParamSlug) {
	const { data: products } = await ProductService.getByCategory(
		params?.slug as string
	)

	const { data: category } = await CategoryService.getBySlug(
		params?.slug as string
	)

	return { products, category }
}

export default async function CategoryPage({ params }: IPageSlugParam) {
	const data = await getProducts(params)

	return <Catalog products={data.products || []} title={data.category.name} />
}
