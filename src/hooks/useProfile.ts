import { useQuery } from '@tanstack/react-query'

import { transformUserToState } from '@/utils/transform-user-to-state'

import { UserService } from '@/services/user/user.service'

export const useProfile = () => {
	const { data, refetch, isLoading } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data,
		refetchInterval: 1800000,
		retry: 1
	})

	const profile = data

	const userState = profile ? transformUserToState(profile) : null

	return {
		isLoading,
		refetch,
		user: {
			...profile,
			...userState
		}
	}
}
