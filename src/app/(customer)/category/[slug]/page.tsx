import { Metadata, ResolvingMetadata } from 'next'

import Heading from '@/ui/Heading'
import Catalog from '@/ui/catalog/Catalog'

import { IPageSlugParams, TParamSlug } from '@/types/page-params.types'

import { CategoryService } from '@/services/category/category.service'
import { ProductService } from '@/services/product/product.service'

export async function generateStaticParams() {
	const categories = await CategoryService.getAll()

	const paths = categories.map(category => {
		return {
			params: { slug: category.slug }
		}
	})

	return paths
}

export async function generateMetadata(
	{ params }: IPageSlugParams,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { category, products } = await getProducts(params)
	return {
		title: category.name,
		description: category.description,
		openGraph: {
			images: products[0]?.images[0],
			description: products[0]?.description
		}
	}
}

async function getProducts(params: TParamSlug) {
	const { data: products } = await ProductService.getByCategory(
		params?.slug as string
	)

	const { data: category } = await CategoryService.getBySlug(
		params?.slug as string
	)

	return { products, category }
}

export default async function CategoryPage({ params }: IPageSlugParams) {
	const data = await getProducts(params)

	return (
		<div className='px-10 pb-10'>
			<Heading>{data.category.name}</Heading>
			<Catalog products={data.products || []} />
		</div>
	)
}
