import { TUser } from '@/types/user.type'
import { SubmitHandler } from 'react-hook-form'

export interface IUserFormState extends Omit<TUser, 'id'> {
	password?: string
}

export type TypeUserForm = 'create' | 'edit' | 'update-profile'

export interface IQuieriesResult {
	data?: Omit<TUser, 'password'>
	isLoading?: boolean
	isinitialUserLoading?: boolean
	isNeedResetForm?: boolean
	onSubmit: SubmitHandler<IUserFormState>
}

export interface IUserForm {
	type: TypeUserForm
	id?: string
	queriesResult: IQuieriesResult
}
