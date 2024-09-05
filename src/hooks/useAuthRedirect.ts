import { useUserStore } from '@/store/user/userStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { user } = useUserStore()

	const { replace } = useRouter()

	useEffect(() => {
		if (user) replace('/')
	}, [user])
}
