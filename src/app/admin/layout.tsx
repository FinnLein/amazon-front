import '@/assets/styles/globals.scss'
import Header from '@/ui/layout/header/Header'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<section className="bg-secondary flex flex-col">
				<Header className='mb-20' />
				<div className='flex  justify-center mb-14'>
					<ul className=' flex  gap-12 px-5 py-2  bg-bg-color rounded-lg'>
						<li>
							<Link href={'/admin'}>Admin home</Link>
						</li>
						<li>
							<Link href={'/admin/main-chart'}>Main chart</Link>
						</li>
						<li>
							<Link href={'/admin/users'}>Manage users</Link>
						</li>
						<li>
							<Link href={'/admin/products'}>Manage products</Link>
						</li>
					</ul>
				</div>
				<section className='px-40 py-4  text-white rounded-tl-lg'>
					{children}
				</section>
			</section>
		</>
	)
}
