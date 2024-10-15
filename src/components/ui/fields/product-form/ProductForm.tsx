'use client'

import { IProductForm } from './product-form.types'
import { ProductEditingForm } from './ProductEditingForm'
import { useProductQueries } from './useProductQueries'

export function ProductForm({ id, type }: Pick<IProductForm, 'id' | 'type'>) {
	const result = useProductQueries(id, type === 'create')

	return <ProductEditingForm id={id} type={type} queriesResult={result} />
}
