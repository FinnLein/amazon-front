import { SubmitHandler } from 'react-hook-form'

import { IProduct, IProductData } from '@/types/product.interface'

import { IQueriesResult, TypeForm } from '../form.types'

export interface IProductForm {
	type: TypeForm
	id?: string
	queriesResult: IQueriesResult<IProduct, SubmitHandler<IProductFormState>>
}

export interface IProductFormState extends IProductData {}
