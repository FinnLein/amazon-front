'use client'

import { m } from 'framer-motion'

import BrandsMenu from './brands/BrandsMenu'
import CategoriesMenu from './categories/CategoriesMenu'
import { useManageBrands } from '@/screens/admin/brands/useManageBrands'
import { useManageCategories } from '@/screens/admin/categories/useManageCategories'

export default function CatalogMenu() {
	const { categories, isLoading: isLoadingCategories } = useManageCategories()
	const { brands, isLoading: isLoadingBrands } = useManageBrands()

	return (
		<m.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: 400, opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			className='bg-secondary overflow-auto rounded-xl absolute top-[4.7rem] left-0 z-40 flex gap-10 p-8'
		>
			<CategoriesMenu categories={categories || []} />
			<BrandsMenu brands={brands || []} />
		</m.div>
	)
}
