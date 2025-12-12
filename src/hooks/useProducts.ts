import { useMutation, useQuery } from '@tanstack/react-query'

import { useFilters } from '@/ui/filters/useFilters'

import { IPaginationResponse } from '@/types/pagination.interface'
import { IProduct } from '@/types/product.interface'

import { ProductService } from '@/services/product/product.service'

export const useManageProducts = (
	initialProducts?: IPaginationResponse<IProduct>
) => {
	const { queryParams, isFilterUpdated } = useFilters()

	const { isLoading, data, refetch, isFetching, isPending } = useQuery({
		queryKey: ['get all products', queryParams],
		queryFn: () => ProductService.getAll(queryParams),
		enabled: isFilterUpdated,
		initialData: initialProducts
	})

	const { mutate: deleteProduct, isPending: isPendingDelete } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (id: number) => ProductService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const products = data?.items?.length ? data.items : null

	return {
		products,
		isHasMore: data?.isHasMore,
		totalCount: data?.totalCount,
		deleteProduct,
		isLoading: isLoading || isPending || isPendingDelete || isFetching,
		maxPrice: data?.maxPrice,
		minPrice: data?.minPrice
	}
}
