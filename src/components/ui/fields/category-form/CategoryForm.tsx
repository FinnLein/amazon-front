'use client'

import { CategoryEditingForm } from './CategoryEditingForm'
import { ICategoryForm } from './category-form'
import { useCategoryQueries } from './useCategoryQueries'

export function CategoryForm({ id, type }: Pick<ICategoryForm, 'id' | 'type'>) {
	const result = useCategoryQueries(id, type === 'create')

	return <CategoryEditingForm queryResult={result} id={id} type={type} />
}
