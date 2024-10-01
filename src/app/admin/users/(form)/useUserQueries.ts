'use client'

import { UserService } from '@/services/user/user.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IQuieriesResult, IUserFormState } from './user-form.types'

export function useUserQueries(
	id = '',
	isCreateForm: boolean
): IQuieriesResult {
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
			push('/')
		}
	})
	const { mutate: updateUser, isPending: isPendingUpdate } = useMutation({
		mutationKey: ['updateUser'],
		mutationFn: (data: IUserFormState) => UserService.update(id, data),
		onSuccess() {
			toast.success('User updated successfully')
			refetch()
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
