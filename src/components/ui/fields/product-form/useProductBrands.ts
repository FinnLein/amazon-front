import { useQuery } from '@tanstack/react-query'

import { ISelectItem } from '@/ui/select/select.interface'

import { BrandService } from '@/services/brand/brand.service'

export const useProductBrands = () => {
	const { isLoading: isLoadingBrands, data } = useQuery({
		queryKey: ['get brands'],
		queryFn: () =>
			BrandService.getAll({
				perPage: 1000,
				skip: 0
			}),
		select: ({ data }) =>
			data.items.map(
				(brand): ISelectItem => ({
					label: brand.name,
					key: brand.id
				})
			)
	})

	return {
		isLoadingBrands,
		data
	}
}
