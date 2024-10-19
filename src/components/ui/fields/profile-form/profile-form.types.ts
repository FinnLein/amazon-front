import { SubmitHandler } from 'react-hook-form'

import { TFullUser } from '@/types/user.type'

import { IQuieriesResult, IUserFormState } from '../user-form/user-form.types'

export interface IQuieriesResultProfile extends IQuieriesResult {
	data?: TFullUser
	onSubmit: SubmitHandler<IUserFormState>
}

export interface IProfileForm {
	queriesResult: IQuieriesResultProfile
}
