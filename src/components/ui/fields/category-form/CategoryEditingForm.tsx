import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Loader } from '@/ui/Loader'
import Button from '@/ui/button/Button'

import { CategoryFields } from './CategoryFields'
import { CategoryHeading } from './CategoryHeading'
import { ICategoryForm, ICategoryFormState } from './category-form.types'

export function CategoryEditingForm({
	type,
	id,
	queryResult: { isLoading, isNeedResetForm, data, onSubmit }
}: ICategoryForm) {
	const {
		register,
		control,
		getValues,
		setValue,
		reset,
		formState: { errors },
		handleSubmit
	} = useForm<ICategoryFormState>({
		mode: 'onChange'
	})

	useEffect(() => {
		if (!data) reset()

		reset({
			name: data?.name,
			slug: data?.slug,
			description: data?.description
		})
	}, [data])

	useEffect(() => {
		if (isNeedResetForm) reset()
	}, [isNeedResetForm])

	return isLoading ? (
		<Loader className='flex justify-center' />
	) : (
		<div className='p-6 '>
			<h1>
				<CategoryHeading name={data?.name || ''} type={type} />
			</h1>
			<form
				className='min-lg:mt-10 mb-5'
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
			>
				<CategoryFields
					control={control}
					register={register}
					setValue={setValue}
					getValues={getValues}
					errors={errors}
				/>

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
