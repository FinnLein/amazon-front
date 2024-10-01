import { EnumProductSort } from '@/services/product/productSort.enum'

export interface IPaginationParams {
	skip?: number
	take?: number
	searchTerm?: string
}

export interface IPaginationParamsWithSort extends IPaginationParams {
	sort?: EnumProductSort
}

export interface IPaginationResponse<T> {
	items: T[]
	isHasMore: boolean
}