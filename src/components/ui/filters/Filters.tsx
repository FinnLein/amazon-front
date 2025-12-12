import { ResetButton } from './ResetButton'
import { BrandGroup } from './brand-group/BrandGroup'
import { CategoryGroup } from './category-group/CategoryGroup'
import { PriceGroup } from './price-group/PriceGroup'
import { RatingGroup } from './rating-group/RatingGroup'

export function Filters() {
	return (
		<div className='p-5 h-[550px] overflow-auto'>
			<RatingGroup />
			<PriceGroup />
			<CategoryGroup />
			<BrandGroup />
			<ResetButton />
		</div>
	)
}
