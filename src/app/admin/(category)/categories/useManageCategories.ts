'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { CategoryService } from '@/services/category/category.service'

export const useManageCategories = () => {
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get all categories', debouncedSearchTerm],
		queryFn: () => CategoryService.getAll(debouncedSearchTerm)
	})

	useEffect(() => {
		if (page === 1) return

		refetch()
	}, [page])

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
		page,
		setPage,
		searchTerm,
		setSearchTerm,
		isLoading
	}
}
