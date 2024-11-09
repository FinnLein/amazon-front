import { Metadata } from 'next'

import { UserRole } from '@/types/user.interface'

import { protectPage } from '@/utils/server/protect-page'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import MyOrders from '@/screens/my-orders/MyOrders'

export const metadata: Metadata = {
	title: 'My orders',
	...NO_INDEX_PAGE
}

export default async function MyOrdersPage() {
	await protectPage([UserRole.USER])

	return <MyOrders />
}
