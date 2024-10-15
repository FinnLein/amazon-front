import { useQuery } from '@tanstack/react-query'

import { IOption } from '@/ui/select/select.interface'

import { CategoryService } from '@/services/category/category.service'

export const useProductCategories = () => {
	const { isLoading: isLodingCategories, data } = useQuery({
		queryKey: ['get categories'],
		queryFn: () =>
			CategoryService.getAll({
				take: 1000,
				skip: 0
			}),
		select: ({ data }) =>
			data.items.map(
				(category): IOption => ({
					label: category.name,
					value: category.id
				})
			)
	})

	return {
		isLodingCategories,
		data
	}
}
