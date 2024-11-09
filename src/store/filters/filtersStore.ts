import { create } from 'zustand'

import {
	EnumProductSort,
	IProductDataFilters
} from '@/services/product/product.types'

interface IFiltersStore {
	queryParams: IProductDataFilters
	isFilterUpdated: boolean
	updateQueryParam: (data: {
		key: keyof IProductDataFilters
		value: string
	}) => void
	reset: () => void
}

const initialQueryParams: Pick<IFiltersStore, 'queryParams'> = {
	queryParams: {
		sort: EnumProductSort.NEWEST,
		searchTerm: '',
		perPage: 4,
		page: 1
	}
}

export const useFiltersStore = create<IFiltersStore>()(set => ({
	...initialQueryParams,
	isFilterUpdated: false,

	updateQueryParam({ key, value }) {
		set(state => ({
			queryParams: { ...state.queryParams, [key]: value },
			isFilterUpdated: true
		}))
	},
	reset() {
		set(() => ({
			...initialQueryParams,
			isFilterUpdated: true
		}))
	}
}))
