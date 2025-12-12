import { Metadata, NextPage } from 'next'

import { ManageReviews } from '../../../../components/screens/admin/reviews/ManageReviews'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Reviews',
	...NO_INDEX_PAGE
}

const ReviewPage: NextPage = () => {
	return <ManageReviews />
}

export default ReviewPage
