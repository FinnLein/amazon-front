import { TUser } from '@/types/user.type'
import { SubmitHandler } from 'react-hook-form'
import { IQuieriesResult, IUserFormState } from '../user-form/user-form.types'

export interface IQuieriesResultProfile extends IQuieriesResult {
	data?: TUser
	onSubmit: SubmitHandler<IUserFormState>
}

export interface IProfileForm {
	queriesResult: IQuieriesResultProfile
}
