'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Loader } from '@/ui/Loader'
import Button from '@/ui/button/Button'

import { ProductFields } from './ProductFields'
import { ProductHeading } from './ProductHeading'
import { IProductForm, IProductFormState } from './product-form.types'

export function ProductEditingForm({
	type,
	queriesResult: { data, onSubmit, isLoading, isNeedResetForm }
}: IProductForm) {
	const {
		register,
		control,
		formState: { errors },
		setValue,
		getValues,
		handleSubmit,
		reset
	} = useForm<IProductFormState>({ mode: 'onChange' })

	useEffect(() => {
		if (!data) reset()

		reset({
			name: data?.name,
			slug: data?.slug,
			category: {
				id: data?.category.id,
				name: data?.category.name,
				slug: data?.category.slug
			},
			brand: {
				id: data?.brand?.id,
				name: data?.brand?.name,
				slug: data?.brand?.slug
			},
			price: data?.price,
			images: data?.images,
			description: data?.description
		})
	}, [data])

	useEffect(() => {
		if (isNeedResetForm) reset()
	}, [isNeedResetForm])

	return isLoading ? (
		<Loader className='flex justify-center' />
	) : (
		<form
			className='min-lg:mt-10 mb-5'
			autoComplete='off'
			onSubmit={handleSubmit(onSubmit)}
			encType='multipart/form-data'
		>
			<h1 className='mb-10'>
				<ProductHeading name={data?.name || ''} type={type} />
			</h1>
			<ProductFields
				register={register}
				control={control}
				errors={errors}
				getValues={getValues}
				setValue={setValue}
				type={type}
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
	)
}
