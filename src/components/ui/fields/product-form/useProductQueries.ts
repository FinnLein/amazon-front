'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { TProductData } from '@/types/product.type'

import { IProductFormState, IQuieriesResultProduct } from './product-form.types'
import { ProductService } from '@/services/product/product.service'

export const useProductQueries = (
	id = '',
	isCreateForm: boolean
): IQuieriesResultProduct => {
	const { push } = useRouter()
	const [isNeedResetForm, setIsNeedResetForm] = useState(false)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get product by id'],
		queryFn: () => ProductService.getById(id),
		select: ({ data }) => data
	})

	const { mutate: createProduct } = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: TProductData) => ProductService.create(data),
		onSuccess() {
			toast.success('Product created succesfully')
			refetch()
			setIsNeedResetForm(true)
			push('/admin/products')
		},
		onError() {
			toast.error('Something gone wrong')
		}
	})

	const { mutate: updateProduct, isPending: isPendingUpdate } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: TProductData) => ProductService.update(id, data),
		onSuccess() {
			toast.success('Product updated succesfully')
			refetch()
			push('/admin/products')
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
