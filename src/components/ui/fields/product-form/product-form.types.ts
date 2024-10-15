import { TProduct, TProductData } from '@/types/product.type'
import { SubmitHandler } from 'react-hook-form'
import { IQuieriesResult, TypeForm } from './../user-form/user-form.types'
export interface IQuieriesResultProduct extends IQuieriesResult {
	data?: TProduct
	onSubmit: SubmitHandler<IProductFormState>
}

export interface IProductForm {
	type: TypeForm
	id?: string
	queriesResult: IQuieriesResultProduct
}

export interface IProductFormState extends TProductData {}
