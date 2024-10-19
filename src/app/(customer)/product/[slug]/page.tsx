import { SingleProduct } from '@/ui/single-product/SingleProduct'

import { IPageSlugParam, TypeParamSlug } from '@/types/page-params'

import { ProductService } from '@/services/product/product.service'

export async function generateStaticParams() {
	const products = await ProductService.getAll({
		skip: 0,
		take: 100
	})

	const paths = products.data.items.map(p => {
		return {
			params: { slug: p.slug }
		}
	})

	return paths
}

export async function getProducts(params: TypeParamSlug) {
	const { data } = await ProductService.getBySlug(params.slug as string)

	return { data }
}

export default async function ProductPage({ params }: IPageSlugParam) {
	const { data } = await getProducts(params)
	return <SingleProduct data={data} />
}
