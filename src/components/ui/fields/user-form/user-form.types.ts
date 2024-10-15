import { TUser } from '@/types/user.type'
import { SubmitHandler } from 'react-hook-form'

export interface IQuieriesResult {
	isLoading?: boolean
	isNeedResetForm?: boolean
}
export type TypeForm = 'create' | 'edit' | TypeFormUpdateProfile

export interface IUserFormState extends Omit<TUser, 'id'> {
	password?: string
}

export type TypeFormUpdateProfile = 'update-profile'

export interface IQuieriesResultUser extends IQuieriesResult {
	data?: Omit<TUser, 'password'>
	onSubmit: SubmitHandler<IUserFormState>

}

export interface IUserForm {
	type: TypeForm
	id?: string
	queriesResult: IQuieriesResultUser
}
