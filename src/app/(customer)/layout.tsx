import { PropsWithChildren } from 'react'

import Header from '@/ui/layout/header/Header'

export default function CostumerLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<section className=''>
			<Header />
			<div className='grid justify-center'>
				<section className='mt-32 pt-8 pb-32 bg-bg-color rounded-xl w-[97vw]'>
					{children}
				</section>
			</div>
		</section>
	)
}
