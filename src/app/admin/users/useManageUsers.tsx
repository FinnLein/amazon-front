'use client'

import { useDebounce } from '@/hooks/useDebounce'
import { UserService } from '@/services/user/user.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function useManageUsers() {
	const [page, setPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)

	const { data, isPending, refetch } = useQuery({
		queryKey: ['get all users', debounceSearch],
		queryFn: () =>
			UserService.getAll({
				searchTerm: debounceSearch,
				skip: 0,
				take: page * 10
			})
	})

	useEffect(() => {
		if (page === 1) return

		refetch()
	}, [page])

	const { mutate: deleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => UserService.delete(id),
		onSuccess() {
			refetch()
		}
	})

	const users = data?.data.items?.length ? data.data.items : null

	return {
		users,
		isPending,
		deleteUser,
		searchTerm,
		setSearchTerm,
		isHasMore: data?.data.isHasMore,
		setPage
	}
}
