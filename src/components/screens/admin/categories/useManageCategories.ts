'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { useFilters } from '@/ui/filters/useFilters'

import { CategoryService } from '@/services/category/category.service'

export const useManageCategories = () => {
	const { queryParams } = useFilters()

	const { data, isLoading, isFetching, isPending, refetch } = useQuery({
		queryKey: ['get all categories', queryParams],
		queryFn: () => CategoryService.getAll(queryParams)
	})

	const { mutate: deleteCategory } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (id: number) => CategoryService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const categories = data?.length ? data : null

	return {
		categories,
		deleteCategory,
		isLoading: isLoading || isFetching || isPending
	}
}
