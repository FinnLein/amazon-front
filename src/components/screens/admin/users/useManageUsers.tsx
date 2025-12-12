'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { useFilters } from '@/ui/filters/useFilters'

import { UserService } from '@/services/user/user.service'

export function useManageUsers() {
	const { queryParams } = useFilters()
	const {isLoading, isFetching, data, isPending, refetch } = useQuery({
		queryKey: ['get all users', queryParams],
		queryFn: () => UserService.getAll(queryParams)
	})

	const { mutate: deleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => UserService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const users = data?.items?.length ? data.items : null

	return {
		users,
		deleteUser,
		isHasMore: data?.isHasMore,
		totalCount: data?.totalCount,
		isLoading: isLoading || isFetching || isPending
	}
}
