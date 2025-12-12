import type { PropsWithChildren } from 'react'

import Header from '@/ui/layout/header/Header'

export default function CostumerLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<section className=''>
			<Header />
			<section className='mx-auto pt-8  bg-bg-color rounded-xl w-[97vw]'>
				{children}
			</section>
			<div className='bg-secondary w-full h-64'></div>
			<div id='modal'></div>
		</section>
	)
}
