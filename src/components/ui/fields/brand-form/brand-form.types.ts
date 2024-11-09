import { SubmitHandler } from 'react-hook-form'

import { IBrand, IBrandData } from '@/types/brand.interface'

import { IQueriesResult, TypeForm } from '../form.types'

export interface IBrandForm {
	type: TypeForm
	id?: string
	queryResult: IQueriesResult<IBrand, SubmitHandler<IBrandFormState>>
}

export interface IBrandFormState extends IBrandData {}
