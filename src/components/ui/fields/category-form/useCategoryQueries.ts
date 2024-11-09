'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { ICategory } from '@/types/category.interface'

import { IQueriesResult } from '../form.types'

import { ICategoryFormState } from './category-form.types'
import { CategoryService } from '@/services/category/category.service'

export function useCategoryQueries(
	id = '',
	isCreateForm: boolean
): IQueriesResult<ICategory, SubmitHandler<ICategoryFormState>> {
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
			push(ADMIN_PAGES.CATEGORIES)
			setIsNeedResetForm(true)
		}
	})
	const { mutate: updateCategory, isPending } = useMutation({
		mutationKey: ['update category'],
		mutationFn: (data: ICategoryFormState) => CategoryService.update(+id, data),
		onSuccess() {
			refetch()
			toast.success('Category updated successfully')
			push(ADMIN_PAGES.CATEGORIES)
		}
	})

	const onSubmit: SubmitHandler<ICategoryFormState> = data => {
		isCreateForm ? createCategory(data) : updateCategory(data)
	}

	return {
		data,
		isLoading,
		onSubmit,
		isNeedResetForm
	}
}
