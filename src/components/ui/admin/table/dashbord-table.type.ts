import { ReactNode } from 'react'

export interface IDashbordTableBaseData {
	editUrl?: string
	deleteHandler?: () => void
}

interface TableColumn<TData> {
	title: string
	dataIndex: keyof TData
	render: (record: TData, index: number) => ReactNode
}

export type TActions = 'Edit' | 'Delete' 

export interface IDashbordTable<TData extends IDashbordTableBaseData> {
	columns: TableColumn<TData>[]
	data: TData[]
	headerActions: TActions[]
}
