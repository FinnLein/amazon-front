'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { BrandService } from '@/services/brand/brand.service'

export const useManageBrands = () => {
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get all brands', debouncedSearchTerm],
		queryFn: () =>
			BrandService.getAll(debouncedSearchTerm)
	})

	useEffect(() => {
		if (page === 1) return

		refetch()
	}, [page])

	const { mutate: deleteBrand } = useMutation({
		mutationKey: ['delete brand'],
		mutationFn: (id: number) => BrandService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const brands = data?.length ? data : null

	return {
		brands,
		deleteBrand,
		page,
		setPage,
		searchTerm,
		setSearchTerm,
		isLoading,
	}
}
