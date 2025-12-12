'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { useFilters } from '@/ui/filters/useFilters'

import { ReviewService } from '@/services/review/review.service'

export const useManageReviews = () => {
	const { queryParams } = useFilters()

	const { data, isLoading, isFetching, isPending, refetch } = useQuery({
		queryKey: ['get all reviews', queryParams],
		queryFn: () => ReviewService.getAll(queryParams),
		select: data => data
	})

	const { mutate: deleteReview } = useMutation({
		mutationKey: ['delete review'],
		mutationFn: (id: number) => ReviewService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const reviews = data?.items ? data?.items : null

	return {
		reviews,
		deleteReview,
		isLoading: isLoading || isFetching || isPending,
		totalCount: data?.totalCount
	}
}
