import { useQuery } from '@tanstack/react-query'

import { ISelectItem } from '@/ui/select/select.interface'

import { CategoryService } from '@/services/category/category.service'

export const useProductCategories = () => {
	const { isLoading: isLoadingCategories, data } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll(),
		select: data =>
			data.map(
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
