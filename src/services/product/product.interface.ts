import { IPaginationItem } from '@/types/pagination.type'
import { EnumProductSort } from './productSort.enum'

export interface IProduct {
	name: string
	price: number
	description?: string
	image: string[]
	categoryId: number
}

export interface DataFilters extends IPaginationItem {
	sort?: EnumProductSort
	searchTerm?: string
}
