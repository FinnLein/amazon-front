'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { IProduct, IProductData } from '@/types/product.interface'

import { IQueriesResult } from '../form.types'

import { IProductFormState } from './product-form.types'
import { ProductService } from '@/services/product/product.service'

export const useProductQueries = (
	id = '',
	isCreateForm: boolean
): IQueriesResult<IProduct, SubmitHandler<IProductFormState>> => {
	const { push } = useRouter()
	const [isNeedResetForm, setIsNeedResetForm] = useState(false)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get product by id'],
		queryFn: () => ProductService.getById(id),
		select: ({ data }) => data
	})

	const { mutate: createProduct } = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: IProductData) => ProductService.create(data),
		onSuccess() {
			toast.success('Product created successfully')
			refetch()
			setIsNeedResetForm(true)
			push(ADMIN_PAGES.PRODUCTS)
		},
		onError() {
			toast.error('Something gone wrong')
		}
	})

	const { mutate: updateProduct, isPending: isPendingUpdate } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: IProductData) => ProductService.update(id, data),
		onSuccess() {
			toast.success('Product updated successfully')
			refetch()
			push(ADMIN_PAGES.PRODUCTS)
		},
		onError() {
			toast.error('Something gone wrong')
		}
	})

	const onSubmit: SubmitHandler<IProductFormState> = async data => {
		if (isCreateForm) {
			createProduct(data)
		} else if (id) {
			updateProduct(data)
		}
	}

	return {
		onSubmit,
		isNeedResetForm,
		data,
		isLoading: isLoading || isPendingUpdate
	}
}
