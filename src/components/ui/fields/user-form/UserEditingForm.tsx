'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'

import { Loader } from '@/ui/Loader'
import Button from '@/ui/button/Button'

import { UserFormHeading } from './UserFormHeading'
import { UserMainFields } from './UserMainFields'
import { UserProfileFields } from './UserProfileFields'
import { IUserForm, IUserFormState } from './user-form.types'

export function UserEditingForm({
	type,
	queriesResult: {
		onSubmit,
		data,
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
		mode: 'onChange'
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


	return isLoading ? (
		<Loader className='flex justify-center' />
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
				<UserMainFields
					type={type}
					control={control}
					register={register}
					errors={errors}
				/>
				<UserProfileFields control={control} register={register} />

				<Button
					variant='orange'
					className='min-lg:mt-10 my-5'
					disabled={isLoading}
					type='submit'
				>
					{type === 'create' ? 'Create' : 'Save'}
				</Button>
			</form>
		</div>
	)
}
