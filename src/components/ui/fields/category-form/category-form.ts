import { SubmitHandler } from 'react-hook-form'

import { ICategoryData, TCategory } from '@/types/category.type'

import { TypeForm } from '../user-form/user-form.types'

import { IQuieriesResult } from './../user-form/user-form.types'

export interface IQueriesResultCategory extends IQuieriesResult {
	data?: TCategory
	onSubmit: SubmitHandler<ICategoryFormState>
}

export interface ICategoryForm {
	type: TypeForm
	id?: string
	queryResult: IQueriesResultCategory
}

export interface ICategoryFormState extends ICategoryData {}
