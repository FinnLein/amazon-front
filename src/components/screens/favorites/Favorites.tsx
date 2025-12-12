'use client'

import Image from 'next/image'
import Link from 'next/link'

import Heading from '@/ui/Heading'
import Catalog from '@/ui/catalog/Catalog'

import { PUBLIC_PAGES } from '@/config/pages/public.config'

import { useProfile } from '@/hooks/useProfile'

import image from '../../../assets/images/burnice-zzz-burnice.gif'

const Favorites = () => {
	const {
		user: { favorites }
	} = useProfile()

	return (
		<>
			<Heading className='flex justify-center'>Favorites</Heading>

			{favorites?.length ? (
				<>
					<Catalog products={favorites || []} />
				</>
			) : (
				<div className='mt-16 flex pb-40 flex-col justify-center items-center'>
					<div>
						<h3>There is no favorites yet</h3>
						<span>Return to our catalog and choose </span>
						<Link href={PUBLIC_PAGES.HOME}>
							<span className='text-primary'>some favorites</span>
						</Link>
						<Image
							className='rounded-lg justify-self-center mt-4'
							src={image}
							width={300}
							height={400}
							alt='Burnice'
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default Favorites
