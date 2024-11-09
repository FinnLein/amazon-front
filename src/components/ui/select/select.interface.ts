import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { Options } from 'react-select'

export interface ISelectItem<K = string> {
	key: K
	label: string
}

export interface ISelect<K = string> {
	options: Options<ISelectItem<K>>
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	isMulty?: boolean
	placeholder: string
	error?: FieldError | undefined
}
