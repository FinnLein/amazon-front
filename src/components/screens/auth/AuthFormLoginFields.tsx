import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import Field from '@/ui/input/Field'

import { IAuthFormData } from '@/types/user.type'

import { validEmail } from './valid-email'

interface IPropsAuthForm {
	register: UseFormRegister<IAuthFormData>
	errors: FieldErrors<IAuthFormData>
}

export const AuthFormLoginFields: FC<IPropsAuthForm> = ({
	register,
	errors
}) => {
	return (
		<>
			<Field
				placeholder='Email'
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address'
					}
				})}
				error={errors.email}
			/>
			<Field
				placeholder='Password'
				error={errors.password}
				type='password'
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Min lenght should be at least 6 symbols'
					}
				})}
			/>
		</>
	)
}
