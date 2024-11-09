import { SubmitHandler } from 'react-hook-form'

import { ICategory, ICategoryData } from '@/types/category.interface'

import { IQueriesResult, TypeForm } from '../form.types'

export interface ICategoryForm {
	type: TypeForm
	id?: string
	queryResult: IQueriesResult<ICategory, SubmitHandler<ICategoryFormState>>
}

export interface ICategoryFormState extends ICategoryData {}
