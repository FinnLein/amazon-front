'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ICategoryFormState, IQueriesResultCategory } from './category-form'
import { CategoryService } from '@/services/category/category.service'

export function useCategoryQueries(
	id = '',
	isCreateForm: boolean
): IQueriesResultCategory {
	const { push } = useRouter()
	const [isNeedResetForm, setIsNeedResetForm] = useState(false)
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['get category by id', id],
		queryFn: () => CategoryService.getById(id),
		select: ({ data }) => data
	})

	const { mutate: createCategory } = useMutation({
		mutationKey: ['create category'],
		mutationFn: (data: ICategoryFormState) => CategoryService.create(data),
		onSuccess() {
			refetch()
			toast.success('Category created successfully')
			push('/admin/categories')
			setIsNeedResetForm(true)
		}
	})
	const { mutate: updateCategory, isPending } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryFormState) => CategoryService.update(+id, data),
		onSuccess() {
			refetch()
			toast.success('Category updated successfully')
			push('/admin/categories')
		}
	})

	const onSubmit: SubmitHandler<ICategoryFormState> = data => {
		isCreateForm ? createCategory(data) : updateCategory(data)
	}

	console.log(data)

	return {
		data,
		isLoading,
		onSubmit,
		isNeedResetForm
	}
}
