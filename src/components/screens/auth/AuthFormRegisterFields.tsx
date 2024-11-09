import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import Field from '@/ui/input/Field'

import { IAuthFormData } from '@/types/user.interface'

import { validEmail } from './valid-email'
import { validPhone } from './valid-phone'

interface IPropsAuthForm {
	register: UseFormRegister<IAuthFormData>
	errors: FieldErrors<IAuthFormData>
}

export const AuthFormRegisterFields: FC<IPropsAuthForm> = ({
	register,
	errors
}) => {
	return (
		<>
			<Field
				placeholder='Name'
				{...register('name', {
					required: 'Name is required',
					minLength: {
						value: 6,
						message: 'Name should be at least 6 symbols'
					}
				})}
				error={errors.name}
			/>
			<Field
				placeholder='Phone'
				{...register('phone', {
					required: 'Phone is required',
					pattern: {
						value: validPhone,
						message: 'Please enter a valid phone number'
					}
				})}
				error={errors.phone}
			/>
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
