'use client'

import { UserService } from '@/services/user/user.service'
import { useUserStore } from '@/store/user/userStore'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
	const { user } = useUserStore()

	const { data, isLoading } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data,
		enabled: !!user,
		refetchInterval: 1800000
	})

	// const { data: tokensData, isSuccess } = useQuery({
	// 	queryKey: ['new tokens'],
	// 	queryFn: () => AuthService.getNewTokens(),
	// 	select: data => data,
	// 	enabled: !data
	// })

	// useEffect(() => {
	// 	if (!isSuccess) return

	// 	if (tokensData.accessToken)
	// 		saveToStorage({
	// 			accessToken: tokensData.accessToken,
	// 			refreshToken: tokensData.refreshToken,
	// 			user: tokensData.user
	// 		})
	// }, [isSuccess])

	return { profile: data }
}
