import { Metadata, ResolvingMetadata } from 'next'

import { IPageSlugParams, TParamSlug } from '@/types/page-params.types'

import { Product } from '@/screens/product/Product'
import { ProductService } from '@/services/product/product.service'

export async function generateStaticParams() {
	const products = await ProductService.getAll()

	const paths = products.items.map(p => {
		return {
			params: { slug: p.slug }
		}
	})

	return paths
}

export async function generateMetadata(
	{ params }: IPageSlugParams,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { product } = await getProduct(params)

	return {
		title: product.name,
		description: product.description,
		category: product.category.name,
		openGraph: {
			images: product.images || [],
			description: product.description
		}
	}
}

export async function getProduct(params: TParamSlug) {
	const product = await ProductService.getBySlug(params.slug as string)

	const { data: similarProducts } = await ProductService.getSimilar(product.id)
	return { product, similarProducts }
}

export default async function ProductPage({ params }: IPageSlugParams) {
	const { product, similarProducts } = await getProduct(params)
	return (
		<Product
			product={product}
			similarProducts={similarProducts}
			slug={params.slug}
		/>
	)
}
