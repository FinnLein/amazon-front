import '@/assets/styles/globals.scss'
import { getSiteUrl } from '@/config/configUrl'
import { SITE_NAME } from '@/constants/seo.constants'
import { Providers } from '@/providers/Provider'
import { Metadata } from 'next'
import { Golos_Text } from 'next/font/google'
import { PropsWithChildren } from 'react'

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
				<Providers>
					<main>{children}</main>
				</Providers>
				<div id='modal'></div>
			</body>
		</html>
	)
}
