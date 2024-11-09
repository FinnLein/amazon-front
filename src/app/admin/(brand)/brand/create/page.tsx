import { Metadata } from 'next'

import { BrandForm } from '@/ui/fields/brand-form/BrandForm'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Creating brand',
	...NO_INDEX_PAGE
}

export default function CreateCategoryPage() {
	return <BrandForm type='create' />
}
