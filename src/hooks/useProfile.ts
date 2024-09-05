import { UserService } from '@/services/user/user.service'
import { useUserStore } from '@/store/user/userStore'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {

	const {user} = useUserStore()

	const { data } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data,
		enabled: !!user,
		
	})

	return { profile: data  }
}
