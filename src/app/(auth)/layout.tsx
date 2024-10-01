import '@/assets/styles/globals.scss'
import { ADMIN_PANEL_URL } from '@/config/configUrl'
import { getServerAuth } from '@/utils/get-server-auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	const user = await getServerAuth()

	if (user?.isLoggedIn) return redirect(user.isAdmin ? ADMIN_PANEL_URL : '/')

	return <section>{children}</section>
}
