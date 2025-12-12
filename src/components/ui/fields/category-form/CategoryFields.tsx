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

import { ICategoryFormState } from './category-form.types'

export function CategoryFields({
	errors,
	register,
	setValue,
	getValues,
	control
}: {
	control: Control<ICategoryFormState>
	register: UseFormRegister<ICategoryFormState>
	errors: FieldErrors<IProductFormState>
	setValue: UseFormSetValue<ICategoryFormState>
	getValues: UseFormGetValues<ICategoryFormState>
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

			<Controller
				name='description'
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextEditor
						isToolbarExist
						onChange={onChange}
						value={value}
						placeholder='Description'
					/>
				)}
			/>
		</div>
	)
}
