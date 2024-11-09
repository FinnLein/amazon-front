import { Metadata } from 'next'
import { Golos_Text } from 'next/font/google'
import { PropsWithChildren } from 'react'

import { Providers } from '@/providers/Provider'

import { getSiteUrl } from '@/config/configUrl'

import '../assets/styles/globals.scss'

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
		siteName: SITE_NAME
	}
}

const golos = Golos_Text({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
	style: ['normal'],
	variable: '--font-golos'
})

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang='en' className={golos.variable}>
			<body>
				<Providers>{children}</Providers>
				<div id='modal'></div>
			</body>
		</html>
	)
}
