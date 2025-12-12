import { ReactNode } from 'react'

export interface IDashboardTableBaseData {
	editUrl?: string
	viewUrl?: string
	deleteHandler?: () => void
}

interface TableColumn<TData> {
	title: string
	dataIndex: keyof TData
	render: (record: TData, index: number) => ReactNode
}

export type TActions = 'Edit' | 'Delete' | 'View'

export interface IDashboardTable<TData extends IDashboardTableBaseData> {
	columns: TableColumn<TData>[]
	data: TData[]
	headerActions: TActions[]
}
