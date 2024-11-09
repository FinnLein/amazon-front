'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useModalStore } from '@/store/modal/modalStore'

import { useProfile } from '@/hooks/useProfile'

import { IFullUser } from '@/types/user.interface'

import { IQueriesResult } from '../form.types'
import { IUserFormState } from '../user-form/user-form.types'

import { saveTokenStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { UserService } from '@/services/user/user.service'

export function useProfileQueries(
	isAvatar?: boolean
): IQueriesResult<IFullUser, SubmitHandler<IUserFormState>> {
	const [isNeedResetForm, setIsNeedResetForm] = useState(false)
	const { setIsActive } = useModalStore()

	const { user, refetch } = useProfile()

	const { isSuccess, data: dataTokens } = useQuery({
		queryKey: ['new tokens'],
		queryFn: () => AuthService.getNewTokens(),
		enabled: !user,
		select: ({ data }) => data
	})

	useEffect(() => {
		if (!isSuccess) return

		if (dataTokens.accessToken) {
			saveTokenStorage(dataTokens.accessToken)
		}
	}, [isSuccess])

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
		isNeedResetForm,
		onSubmit
	}
}
