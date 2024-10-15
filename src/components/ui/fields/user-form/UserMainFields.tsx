import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

import Field from '@/ui/input/Field'

import { IUserFormState, TypeForm } from './user-form.types'
import { validEmail } from '@/screens/auth/valid-email'

export function UserMainFields({
	errors,
	control,
	register,
	type
}: {
	errors: FieldErrors<IUserFormState>
	control: Control<IUserFormState>
	register: UseFormRegister<IUserFormState>
	type: TypeForm
}) {
	return (
		<div className='grid min-lg:grid-cols-2 gap-5 text-black-700'>
			<Field
				error={errors.email}
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Enter valid email'
					}
				})}
				placeholder='Email'
				autoComplete='none'
			/>
			<Field
				error={errors.name}
				{...register('name', {})}
				placeholder='Name'
				autoComplete='none'
			/>
			{type === 'edit' ? (
				<></>
			) : (
				<Field
					error={errors.password}
					{...register('password')}
					placeholder='Password'
					autoComplete='none'
				/>
			)}
		</div>
	)
}
