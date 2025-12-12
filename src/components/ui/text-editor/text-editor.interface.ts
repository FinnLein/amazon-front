import { EditorProps } from 'draft-js'

import { IFieldProps } from '../input/field.interface'

type TEditorPropsField = EditorProps & IFieldProps

export interface ITextEditor extends Omit<TEditorPropsField, 'editorState'> {
	onChange: (...event: any) => void
	value: string
	isToolbarExist: boolean
}
