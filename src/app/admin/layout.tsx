import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'


import '@/assets/styles/globals.scss'

import { UserRole } from '@/types/user.interface'

import { getServerAuth } from '@/utils/server/get-server-auth'
import { protectPage } from '@/utils/server/protect-page'

import NotFound from '../not-found'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import HeaderAdmin from '@/screens/admin/header/HeaderAdmin'
import AdminMenu from '@/screens/admin/admin-menu/AdminMenu'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	await protectPage([UserRole.ADMIN, UserRole.MANAGER])

	const user = await getServerAuth()

	if (!user?.isAdmin) return <NotFound />

	return (
		<section>
			<HeaderAdmin className='mb-2 flex justify-center' />
			<div
				className='grid'
				style={{
					gridTemplateColumns: '.7fr 4fr'
				}}
			>
				<AdminMenu />

				<section className='px-20 bg-black-800 py-4  text-white rounded-tl-lg'>
					{children}
				</section>
			</div>
		</section>
	)
}
