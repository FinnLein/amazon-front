'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import Heading from '@/ui/Heading'

import { PUBLIC_PAGES } from '@/config/pages/public.config'

import { IProduct } from '@/types/product.interface'

import { ProductDescription } from './ProductDescription'
import { ProductGallery } from './ProductGallery'
import { ProductReviewCount } from './ProductReviewsCount'
import { SimilarProducts } from './SimilarProducts'
import { ProductInformation } from './product-information/ProductInformation'
import { ProductReview } from './product-reviews.tsx/ProductReviews'
import { ProductService } from '@/services/product/product.service'

export function Product({
	product,
	similarProducts,
	slug = ''
}: {
	product: IProduct
	similarProducts: IProduct[]
	slug?: string
}) {
	const {} = useQuery({
		queryKey: ['get product', product.id],
		queryFn: () => ProductService.getBySlug(slug),
		initialData: product,
		enabled: !!slug
	})

	return (
		<div className='px-10 pb-5 grid justify-items-center lg:justify-items-stretch'>
			<Heading className='mb-1'>{product.name}</Heading>
			<h2 className='text-primary/75 hover:text-primary transition-colors ease-in-out duration-200'>
				<Link href={PUBLIC_PAGES.CATEGORY + `/${product.category.slug}`}>
					{product.category.name}
				</Link>
			</h2>
			<ProductReviewCount product={product} />
			<div className='grid   gap-3 lg:gap-6 xl:gap-12 mt-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
				<ProductGallery images={product.images} />
				<ProductDescription description={product.description} />
				<ProductInformation product={product} />
			</div>

			<SimilarProducts similarProducts={similarProducts} />
			<ProductReview reviews={product.reviews} productId={product.id} />
		</div>
	)
}
