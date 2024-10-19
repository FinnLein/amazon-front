import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

import '@/assets/styles/globals.scss'

import { getServerAuth } from '@/utils/server/get-server-auth'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	const user = await getServerAuth()

	if (user?.isLoggedIn) return redirect('/')

	return <section>{children}</section>
}
