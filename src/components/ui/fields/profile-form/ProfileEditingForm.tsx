import Button from '@/ui/button/Button'
import { IUserFormState } from '@/ui/fields/user-form/user-form.types'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { UserProfileFields } from '../user-form/UserProfileFields'
import { IProfileForm } from './profile-form.types'

export function ProfileEditingForm({
	queriesResult: {
		data,
		isinitialUserLoading,
		isLoading,
		isNeedResetForm,
		onSubmit
	}
}: IProfileForm) {
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
		if (isNeedResetForm) reset()
	}, [isNeedResetForm, reset])

	if (isinitialUserLoading) return <Skeleton />

	return (
		<form
			className='min-lg:mt-10 mb-5'
			autoComplete='off'
			onSubmit={handleSubmit(onSubmit)}
			encType='multipart/form-data'
		>
			<UserProfileFields control={control} register={register} />
			<Button className='mt-5' variant='orange' type='submit'>
				Save
			</Button>
		</form>
	)
}
