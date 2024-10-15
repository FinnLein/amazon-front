import { EnumProductSort } from '@/services/product/productSort.enum'

export interface IPaginationParams {
	take?: number
	skip?: number
	searchTerm?: string
}

export interface IPaginationParamsWithSort extends IPaginationParams {
	sort?: EnumProductSort
}

export interface IPaginationResponse<T> {
	items: T[]
	isHasMore: boolean
}
