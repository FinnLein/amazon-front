import { FC, PropsWithChildren } from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div>
			<Header />
			<div className='grid grid-cols-5'>
				<Sidebar />
				<main className='col-span-4 p-12'>{children}</main>
			</div>
		</div>
	)
}

export default Layout
