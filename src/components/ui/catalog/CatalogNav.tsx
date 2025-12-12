import { ListFilter, X } from 'lucide-react'

import { useSidebarStore } from '@/store/sidebar/sidebarStore'

import { useManageProducts } from '@/hooks/useProducts'

import { IPaginationResponse } from '@/types/pagination.interface'
import { IProduct } from '@/types/product.interface'

import Heading from '../Heading'
import { SortDropdown } from '../sort/SortDropdown'

export function CatalogNav({
	initialProducts
}: {
	initialProducts: IPaginationResponse<IProduct>
}) {
	const { totalCount } = useManageProducts(initialProducts)

	const { isRolledUp, toggleIsRolledUp } = useSidebarStore()

	return (
		<>
			<Heading className='flex justify-center '>Catalog</Heading>

			<div className='border-b pb-2 border-slate-300 '>
				<div className='flex justify-between mx-10 px-2'>
					<button className='flex text-sm' onClick={() => toggleIsRolledUp()}>
						{isRolledUp ? <X size={24} /> : <ListFilter size={24} />}
						<span>Filters</span>
					</button>
					<div className='flex items-center gap-5'>
						{totalCount && <div className='text-sm'>{totalCount} products</div>}
						<SortDropdown bg='light' className='text-sm' />
					</div>
				</div>
			</div>
		</>
	)
}
