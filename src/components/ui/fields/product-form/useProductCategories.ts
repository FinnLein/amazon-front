import { useQuery } from '@tanstack/react-query'

import { ISelectItem } from '@/ui/select/select.interface'

import { CategoryService } from '@/services/category/category.service'

export const useProductCategories = () => {
	const { isLoading: isLoadingCategories, data } = useQuery({
		queryKey: ['get categories'],
		queryFn: () =>
			CategoryService.getAll({
				perPage: 1000,
				skip: 0
			}),
		select: ({ data }) =>
			data.items.map(
				(category): ISelectItem => ({
					label: category.name,
					key: category.id
				})
			)
	})

	return {
		isLoadingCategories,
		data
	}
}
