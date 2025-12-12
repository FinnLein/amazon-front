import { Metadata, NextPage } from 'next'

import { ManageOrders } from '../../../../components/screens/admin/orders/ManageOrders'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Reviews',
	...NO_INDEX_PAGE
}

const ReviewPage: NextPage = () => {
	return <ManageOrders />
}

export default ReviewPage
