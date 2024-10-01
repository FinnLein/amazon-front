'use client'

import Button from '@/ui/button/Button'
import { Loader } from '@/ui/Loader'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { IUserForm, IUserFormState } from '../user-form.types'
import { UserFormHeading } from '../UserFormHeading'
import { UserMainFields } from './UserMainFields'
import { UserProfileFields } from './UserProfileFields'

export function UserEditingForm({
	type,
	queriesResult: {
		onSubmit,
		data,
		isinitialUserLoading,
		isLoading,
		isNeedResetForm
	}
}: IUserForm) {
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<IUserFormState>({
		mode: 'onChange',
		
	})

	useEffect(() => {
		if (!data) return

		reset({
			avatarPath: data.avatarPath,
			role: data.role,
			email: data.email,
			name: data.name
		})
	}, [data])

	useEffect(() => {
		if (isNeedResetForm) reset()
	}, [isNeedResetForm, reset])

	if (isinitialUserLoading) return <Skeleton />

	return isLoading ? (
		<Loader />
	) : (
		<div className='p-6'>
			<h1>
				<UserFormHeading type={type} email={data?.email} />
			</h1>
			<form
				className='min-lg:mt-10 mb-5'
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
				encType='multipart/form-data'
			>
				<UserMainFields control={control} register={register} errors={errors} />
				<UserProfileFields control={control} register={register} />

				<Button
					variant='orange'
					className='min-lg:mt-10 mb-5'
					disabled={isLoading}
					type='submit'
				>
					{type === 'create' ? 'Create' : 'Save'}
				</Button>
			</form>
		</div>
	)
}
