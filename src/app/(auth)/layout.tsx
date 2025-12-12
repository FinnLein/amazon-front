import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

import '@/assets/styles/globals.scss'

import { getServerAuth } from '@/utils/server/get-server-auth'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	const user = await getServerAuth()

	if (user?.isLoggedIn) return redirect('/')

	return <section>{children}</section>
}
