import { RotateCcw } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { useFiltersStore } from '@/store/filters/filtersStore'

import Button from '../button/Button'

export function ResetButton() {
	const pathname = usePathname()
	const { replace } = useRouter()
	const { reset } = useFiltersStore()

	const resetFilters = () => {
		reset()
		replace(pathname)
	}

	return (
		<Button
			className='inline-flex w-full justify-center'
			variant='orange'
			onClick={resetFilters}
		>
			<span>
				<RotateCcw />
			</span>
		</Button>
	)
}
