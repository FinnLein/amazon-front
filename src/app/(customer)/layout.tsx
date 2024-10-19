import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import Header from '@/ui/layout/header/Header'
import Sidebar from '@/ui/layout/sidebar/Sidebar'

import '@/assets/styles/globals.scss'

import { getSiteUrl } from '@/config/configUrl'

import { SITE_NAME } from '@/constants/seo.constants'

export const metadata: Metadata = {
	icons: {
		icon: '/favicon.svg'
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		emails: ['info@amazon.com']
	}
}

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<section className='bg-secondary'>
			<Header />
			<div
				className='grid'
				style={{
					gridTemplateColumns: '.8fr 4fr'
				}}
			>
				<Sidebar />
				<section className='py-8 px-4 pb-52 bg-bg-color rounded-tl-lg'>
					{children}
				</section>
			</div>
		</section>
	)
}
