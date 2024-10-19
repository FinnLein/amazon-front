import { UserRole } from '@/types/user.type'

import { protectPage } from '@/utils/server/protect-page'

import MyOrders from '@/screens/my-orders/MyOrders'

export default async function MyOrdersPage() {
	await protectPage([UserRole.USER])

	return <MyOrders />
}
