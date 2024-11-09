import { Metadata, ResolvingMetadata } from 'next'

import { SingleProduct } from '@/ui/single-product/SingleProduct'

import { IPageSlugParams, TParamSlug } from '@/types/page-params.types'

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
	{ params: { slug } }: IPageSlugParams,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: `Product ${slug}`
	}
}

export async function getProducts(params: TParamSlug) {
	const data = await ProductService.getBySlug(params.slug as string)

	return data
}

export default async function ProductPage({ params }: IPageSlugParams) {
	const data = await getProducts(params)
	return <SingleProduct data={data} />
}
