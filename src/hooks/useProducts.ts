import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/productSort.enum'

export const useManageProducts = (
	pageNumber: number,
	isSkip: boolean,
	isFromFirst: boolean
) => {
	const [page, setPage] = useState(isFromFirst ? 0 : 1)
	const [searchTerm, setSearchTerm] = useState('')
	const [sortType, setSortType] = useState(EnumProductSort.NEWEST)
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	const { isLoading, data, refetch } = useQuery({
		queryKey: ['get all products', debouncedSearchTerm, sortType, page],
		queryFn: () =>
			ProductService.getAll({
				searchTerm: debouncedSearchTerm,
				sort: sortType,
				take: isFromFirst ? pageNumber : pageNumber * page,
				skip: isSkip ? page * pageNumber : 0
			})
	})

	useEffect(() => {
		if (page === 1) return

		refetch()
	}, [page])

	const { mutate: deleteProduct, isPending } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (id: number) => ProductService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const products = data?.data.items.length ? data.data.items : null

	return {
		products,
		isHasMore: data?.data.isHasMore,
		deleteProduct,
		page,
		setPage,
		searchTerm,
		setSearchTerm,
		sortType,
		setSortType,
		isLoading: isLoading || isPending
	}
}
