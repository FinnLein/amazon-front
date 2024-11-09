import {
	Control,
	Controller,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue
} from 'react-hook-form'

import Field from '@/ui/input/Field'
import SlugField from '@/ui/input/SlugField'
import TextEditor from '@/ui/text-editor/TextEditor'

import generateSlug from '@/utils/strings/generateSlug'

import { IProductFormState } from '../product-form/product-form.types'

import { IBrandFormState } from './brand-form.types'

export function BrandFields({
	errors,
	register,
	setValue,
	getValues,
	control
}: {
	control: Control<IBrandFormState>
	register: UseFormRegister<IBrandFormState>
	errors: FieldErrors<IProductFormState>
	setValue: UseFormSetValue<IBrandFormState>
	getValues: UseFormGetValues<IBrandFormState>
}) {
	return (
		<div className='text-black-700'>
			<Field
				placeholder='Name'
				{...register('name', {
					required: 'Name is required'
				})}
			/>

			<SlugField
				register={register}
				placeholder=''
				error={errors.slug}
				generate={() => setValue('slug', generateSlug(getValues('name')))}
			/>
		</div>
	)
}
