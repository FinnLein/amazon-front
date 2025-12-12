'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useFiltersStore } from '@/store/filters/filtersStore'

import { IProductDataFilters } from '@/services/product/product.types'

export function useFilters() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { replace } = useRouter()

	const { queryParams, isFilterUpdated, updateQueryParam } = useFiltersStore()

	useEffect(() => {
		searchParams.forEach((value, key) => {
			updateQueryParam({
				key: key as keyof IProductDataFilters,
				value
			})
		})
	}, [])

	const updateQueryParams = (key: keyof IProductDataFilters, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString())

		if (key !== 'page' && key !== 'perPage') {
			newParams.set('page', '1')
		}
		if (value) {
			newParams.set(key, String(value))
		} else {
			newParams.delete(key)
		}

		replace(pathname + `?${newParams.toString()}`)
		updateQueryParam({ key, value })
	}

	return {
		updateQueryParams,
		queryParams,
		isFilterUpdated
	}
}
