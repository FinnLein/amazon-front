import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { Options } from 'react-select'

export interface IOption {
	value: string
	label: string
}

export interface ISelect {
	options: Options<IOption>
	field: ControllerRenderProps<any, any>
	isLoading?: boolean
	isMulty?: boolean
	placeholder: string
	error?: FieldError | undefined
}
