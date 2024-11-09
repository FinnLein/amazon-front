import Link from 'next/link'

import Heading from '@/ui/Heading'

import '@/assets/styles/globals.scss'

export default function NotFound() {
	return (
		<div className='flex h-screen justify-center items-center text-white'>
			<div>
				<Heading>Not Found</Heading>
				<p>Could not find requested resource</p>
				<p>
					<Link href='/' className='text-primary'>
						Home
					</Link>
				</p>
			</div>
		</div>
	)
}
