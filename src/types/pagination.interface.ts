import { EnumProductSort } from '@/services/product/product.types'

export interface IPaginationParams {
	perPage: number | string
	page?: number | string
	searchTerm?: string
}

export interface IPaginationParamsWithSort extends IPaginationParams {
	sort?: EnumProductSort
}

export interface IPaginationResponse<T> {
	items: T[]
	isHasMore: boolean
	totalCount: number
}
