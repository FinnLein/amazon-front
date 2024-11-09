import { Metadata } from 'next'

import { ProductForm } from '@/ui/fields/product-form/ProductForm'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Product',
	...NO_INDEX_PAGE
}

export default function ProductCreatePage() {
	return <ProductForm type='create' />
}
