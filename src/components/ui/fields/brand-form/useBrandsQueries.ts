'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { IBrand } from '@/types/brand.interface'

import { IQueriesResult } from '../form.types'

import { IBrandFormState } from './brand-form.types'
import { BrandService } from '@/services/brand/brand.service'

export function useBrandQueries(
	id = '',
	isCreateForm: boolean
): IQueriesResult<IBrand, SubmitHandler<IBrandFormState>> {
	const { push } = useRouter()
	const [isNeedResetForm, setIsNeedResetForm] = useState(false)
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['get brand by id', id],
		queryFn: () => BrandService.getById(id),
		select: ({ data }) => data
	})

	const { mutate: createBrand } = useMutation({
		mutationKey: ['create brand'],
		mutationFn: (data: IBrandFormState) => BrandService.create(data),
		onSuccess() {
			refetch()
			toast.success('Brand created successfully')
			push(ADMIN_PAGES.BRANDS)
			setIsNeedResetForm(true)
		}
	})
	const { mutate: updateBrand, isPending } = useMutation({
		mutationKey: ['update brand'],
		mutationFn: (data: IBrandFormState) => BrandService.update(+id, data),
		onSuccess() {
			refetch()
			toast.success('Brand updated successfully')
			push(ADMIN_PAGES.BRANDS)
		}
	})

	const onSubmit: SubmitHandler<IBrandFormState> = data => {
		isCreateForm ? createBrand(data) : updateBrand(data)
	}

	return {
		data,
		isLoading,
		onSubmit,
		isNeedResetForm
	}
}
