import { IPaginationItem } from '@/types/pagination.type'
import { EnumProductSort } from './productSort.enum'
import { TProduct } from '@/types/product.type'

export interface TProductData {
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

export type TypeProducts = {
	products: TProduct[]
}
