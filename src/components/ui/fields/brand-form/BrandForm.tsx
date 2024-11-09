'use client'

import { BrandEditingForm } from './BrandEditingForm'
import { IBrandForm } from './brand-form.types'
import { useBrandQueries } from './useBrandsQueries'

export function BrandForm({ id, type }: Pick<IBrandForm, 'id' | 'type'>) {
	const result = useBrandQueries(id, type === 'create')

	return <BrandEditingForm queryResult={result} id={id} type={type} />
}
