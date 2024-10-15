import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useModalStore } from '@/store/modal/modalStore'
import { useUserStore } from '@/store/user/userStore'

import { IUserFormState } from '../user-form/user-form.types'

import { IQuieriesResultProfile } from './profile-form.types'
import { UserService } from '@/services/user/user.service'

export function useProfileQueries(isAvatar?: boolean): IQuieriesResultProfile {
	const { user } = useUserStore()

	const [isNeedResetForm, setIsNeedResetForm] = useState(false)
	const { setIsActive } = useModalStore()

	const { data, refetch, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => UserService.getProfile(),
		select: ({ data }) => data,
		enabled: !!user,
		refetchInterval: 1800000
	})

	const { mutate: updateProfile } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IUserFormState) => UserService.updateProfile(data),
		onSuccess() {
			toast.success('Profile updated successfully')
			setIsNeedResetForm(true)
			refetch()
		}
	})

	const { mutate: updateProfileAvatar } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: IUserFormState) => UserService.updateProfileAvatar(data),
		onSuccess() {
			toast.success('Avatar updated successfully')
			setIsNeedResetForm(true)
			setIsActive(false)
			refetch()
		}
	})

	const onSubmit: SubmitHandler<IUserFormState> = data => {
		isAvatar ? updateProfileAvatar(data) : updateProfile(data)
	}

	return {
		data,
		isLoading,
		isNeedResetForm,
		onSubmit,
		isinitialUserLoading: isLoading
	}
}
