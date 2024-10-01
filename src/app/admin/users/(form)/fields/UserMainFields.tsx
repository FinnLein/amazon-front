import { validEmail } from '@/screens/auth/valid-email'
import Field from '@/ui/input/Field'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { IUserFormState } from '../user-form.types'

export function UserMainFields({
	errors,
	control,
	register
}: {
	errors: FieldErrors<IUserFormState>
	control: Control<IUserFormState>
	register: UseFormRegister<IUserFormState>
}) {
	return (
		<div className='grid min-lg:grid-cols-2 gap-5'>
			<Field
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
			<Field {...register('name', {})} placeholder='Name' autoComplete='none' />
			<Field
				{...register('password')}
				placeholder='Password'
				autoComplete='none'
			/>
		</div>
	)
}
