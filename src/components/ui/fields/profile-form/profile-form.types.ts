import { SubmitHandler } from 'react-hook-form'

import { IFullUser } from '@/types/user.interface'

import { IQueriesResult } from '../form.types'
import { IUserFormState } from '../user-form/user-form.types'

export interface IProfileForm {
	queriesResult: IQueriesResult<IFullUser, SubmitHandler<IUserFormState>>
}
