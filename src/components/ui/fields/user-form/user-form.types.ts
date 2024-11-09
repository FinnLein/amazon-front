import { SubmitHandler } from 'react-hook-form'

import { IUser } from '@/types/user.interface'

import { IQueriesResult, TypeForm } from '../form.types'

export interface IUserFormState extends Omit<IUser, 'id'> {
	password?: string
}

export interface IUserForm {
	type: TypeForm
	id?: string
	queriesResult: IQueriesResult<
		Omit<IUser, 'password'>,
		SubmitHandler<IUserFormState>
	>
}
