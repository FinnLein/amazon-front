import { IBrand } from '@/types/brand.interface'
import { ICategory } from '@/types/category.interface'
import { IPaginationParamsWithSort } from '@/types/pagination.interface'

export enum EnumProductSort {
	HIGH_PRICE = 'HIGH_PRICE',
	LOW_PRICE = 'LOW_PRICE',
	OLDEST = 'OLDEST',
	NEWEST = 'NEWEST'
}

export interface IProductDataFilters extends IPaginationParamsWithSort {
	brand?: IBrand
	category?: ICategory
	rating?: string
	minPrice?: string
	maxPrice?: string
}

export type TSearchParams = {
	searchParams: IProductDataFilters
}
