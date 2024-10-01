'use client'

import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/productSort.enum'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export const useManageProducts = () => {
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)

	const { data, refetch, isLoading } = useQuery({
		queryKey: ['get all products', searchTerm, sortType, page],
		queryFn: () =>
			ProductService.getAll({
				searchTerm,
				skip: 4,
				take: page * 4,
				sort: sortType
			})
	})

	useEffect(() => {
		if (page === 1) return
		refetch()
	}, [page])

	const products = data?.data.items.length ? data.data.items : null

	return {
		products,
		page,
		setPage,
		searchTerm,
		setSearchTerm,
		isHasMore: data?.data.isHasMore,
		sortType,
		setSortType,
		isLoading
	}
}
