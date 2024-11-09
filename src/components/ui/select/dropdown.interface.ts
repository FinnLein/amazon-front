import { ISelectItem } from './select.interface'

export interface IDropdown<K = string> {
	data: ISelectItem<K>[]
	onChange: (item: ISelectItem<K>) => void
	value?: ISelectItem<K>
	title?: string
	className?: string
	bg?: 'light' | 'dark'
}
