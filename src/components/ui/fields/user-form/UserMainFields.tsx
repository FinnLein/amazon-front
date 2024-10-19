'use client'

import { MouseEvent, useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import Field from '@/ui/input/Field'

import { UserRole } from '@/types/user.type'

import { IUserFormState, TypeForm } from './user-form.types'
import { validEmail } from '@/screens/auth/valid-email'

export function UserMainFields({
	errors,
	register,
	type,
	setValue,
	rights
}: {
	errors: FieldErrors<IUserFormState>
	register: UseFormRegister<IUserFormState>
	type: TypeForm
	setValue: UseFormSetValue<IUserFormState>
	rights: UserRole[]
}) {
	const allRights: UserRole[] = [
		UserRole.ADMIN,
		UserRole.MANAGER,
		UserRole.PREMIUM,
		UserRole.USER
	]
	const [currentRights, setCurrentRights] = useState<UserRole[]>(rights)

	const toggleRights = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		const role = event.currentTarget.value as UserRole

		setCurrentRights(prevRights => {
			const rightsArray = Array.isArray(prevRights) ? prevRights : [prevRights]

			if (rightsArray.includes(role)) {
				return rightsArray.filter(r => r !== role)
			} else {
				return [...rightsArray, role]
			}
		})
	}

	type === 'create'
		? setValue('rights', [UserRole.USER, ...currentRights])
		: setValue('rights', [...currentRights])

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
				{...register('name')}
				placeholder='Name'
				autoComplete='none'
			/>
			<Field
				{...register('rights')}
				readOnly
				placeholder='rights'
				autoComplete='none'
			/>
			<div className='flex gap-5'>
				{allRights.map(r => {
					if (r === UserRole.USER) {
						return null
					} else {
						return (
							<button
								key={r}
								value={r}
								onClick={e => toggleRights(e)}
								className='bg-white p-2 rounded-xl'
							>
								{r}
							</button>
						)
					}
				})}
			</div>
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
