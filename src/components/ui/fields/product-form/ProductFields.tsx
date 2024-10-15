import {
	Control,
	Controller,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue
} from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import Field from '@/ui/input/Field'
import { Select } from '@/ui/select/Select'
import TextEditor from '@/ui/text-editor/TextEditor'
import UploadField from '@/ui/upload-field/UploadField'

import generateSlug from '@/utils/strings/generateSlug'

import SlugField from '../../input/SlugField'
import { TypeForm } from '../user-form/user-form.types'

import { IProductFormState } from './product-form.types'
import { useProductCategories } from './useProductCategories'

export function ProductFields({
	errors,
	control,
	register,
	setValue,
	getValues
}: {
	type: TypeForm
	errors: FieldErrors<IProductFormState>
	control: Control<IProductFormState>
	register: UseFormRegister<IProductFormState>
	getValues: UseFormGetValues<IProductFormState>
	setValue: UseFormSetValue<IProductFormState>
}) {
	const { isLodingCategories, data } = useProductCategories()

	return (
		<div className='grid min-lg:grid-cols-2 gap-5 text-black-700'>
			<div className='grid grid-cols-4 gap-5 items-center'>
				<Field
					placeholder='Name'
					{...register('name', {
						required: 'Name is required'
					})}
				/>
				<SlugField
					placeholder='Slug'
					register={register}
					error={errors.slug}
					generate={() => setValue('slug', generateSlug(getValues('name')))}
				/>
				<Controller
					name='category.id'
					control={control}
					rules={{
						required: 'Please select at least one category'
					}}
					render={({ field, fieldState: { error } }) => (
						<Select
							field={field}
							error={error}
							options={data || []}
							placeholder='Category'
							isLoading={isLodingCategories}
						/>
					)}
				/>
				<Field
					className={'w-1/2'}
					placeholder='Price'
					{...register('price', {
						required: 'Price is required',
						setValueAs: value => parseFloat(value)
					})}
				/>
			</div>

			<Controller
				name='images'
				control={control}
				rules={{
					required: 'Product should have images'
				}}
				render={({ field: { onChange, value } }) => (
					<UploadField
						className='text-white	'
						value={value}
						onChange={onChange}
						placeholder='Upload images'
						isMultiple={true}
					/>
				)}
			/>
			<Controller
				name='description'
				control={control}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<TextEditor
						value={value}
						onChange={onChange}
						placeholder='Description'
						error={error}
					/>
				)}
				rules={{
					validate: {
						required: v =>
							(v && stripHtml(v).result.length > 0) || 'Description is required'
					}
				}}
			/>
		</div>
	)
}
