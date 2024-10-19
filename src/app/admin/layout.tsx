import { PropsWithChildren } from 'react'

import AdminMenu from '@/ui/admin/admin-menu/AdminMenu'
import HeaderAdmin from '@/ui/admin/header/HeaderAdmin'

import '@/assets/styles/globals.scss'

import { UserRole } from '@/types/user.type'

import { getServerAuth } from '@/utils/server/get-server-auth'
import { protectPage } from '@/utils/server/protect-page'

import NotFound from '../not-found'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	await protectPage([UserRole.ADMIN, UserRole.MANAGER])

	const user = await getServerAuth()

	if (!user?.isAdmin) return <NotFound />

	return (
		<section>
			<HeaderAdmin className='mb-2 flex justify-center' />
			<div
				className='bg-secondary grid'
				style={{
					gridTemplateColumns: '.8fr 4fr'
				}}
			>
				<AdminMenu />

				<section className='px-20 py-4 mb-5 text-white rounded-tl-lg'>
					{children}
				</section>
			</div>
		</section>
	)
}
