'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ADMIN_PAGES } from '@/config/pages/admin.config'

import { IUser } from '@/types/user.interface'

import { IQueriesResult } from '../form.types'

import { IUserFormState } from './user-form.types'
import { UserService } from '@/services/user/user.service'

export function useUserQueries(
	id = '',
	isCreateForm: boolean
): IQueriesResult<Omit<IUser, 'password'>, SubmitHandler<IUserFormState>> {
	const { push } = useRouter()
	const [isNeedResetForm, setIsNeedResetForm] = useState(false)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['user by id', id],
		queryFn: () => UserService.byId(id),
		select: ({ data }) => data
	})

	const { mutate: createUser } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: IUserFormState) => UserService.create(data),
		onSuccess() {
			toast.success('User created successfully')
			refetch()
			setIsNeedResetForm(true)
			push(ADMIN_PAGES.USERS)
		}
	})
	const { mutate: updateUser, isPending: isPendingUpdate } = useMutation({
		mutationKey: ['updateUser'],
		mutationFn: (data: IUserFormState) => UserService.update(id, data),
		onSuccess() {
			toast.success('User updated successfully')
			refetch()
			push(ADMIN_PAGES.USERS)
		}
	})

	const onSubmit: SubmitHandler<IUserFormState> = async data => {
		if (isCreateForm) {
			createUser(data)
		} else if (id) {
			updateUser(data)
		}
	}

	return {
		data,
		isLoading: isLoading || isPendingUpdate,
		onSubmit,
		isNeedResetForm
	}
}
