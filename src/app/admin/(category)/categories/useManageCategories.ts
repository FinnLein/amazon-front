'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { CategoryService } from '@/services/category/category.service'

export const useManageCategories = (takenPages: number) => {
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get all categories', debouncedSearchTerm],
		queryFn: () =>
			CategoryService.getAll({
				searchTerm: debouncedSearchTerm,
				skip: 0,
				take: page * takenPages
			})
	})

	useEffect(() => {
		if (page === 1) return

		refetch()
	}, [page])

	const { mutate: deleteCategory } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (id: number) => CategoryService.delete(id)
	})

	const categories = data?.data.items.length ? data.data.items : null

	return {
		categories,
		deleteCategory,
		page,
		setPage,
		searchTerm,
		setSearchTerm,
		isLoading,
		isHasMore: data?.data.isHasMore
	}
}
