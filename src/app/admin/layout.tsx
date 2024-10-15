import { PropsWithChildren } from 'react'

import AdminMenu from '@/ui/admin/admin-menu/AdminMenu'
import HeaderAdmin from '@/ui/layout/header/HeaderAdmin'

import '@/assets/styles/globals.scss'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
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