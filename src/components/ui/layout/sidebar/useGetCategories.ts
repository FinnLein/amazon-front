import { useQuery } from '@tanstack/react-query'
import { CategoryService } from '@/services/category/category.service'

export const useGetCategories = () =>{
	const { data, isLoading } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll(),
		select: ({ data }) => data
	})
	
	return {data, isLoading}
}

