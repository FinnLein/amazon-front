import { Lock } from 'lucide-react'
import Link from 'next/link'

import FavoriteButton from '@/ui/catalog/product-item/FavoriteButton'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import { AddToCartInline } from './AddToCartInline'

export function ProductInformation({ product }: { product: IProduct }) {
	const today = new Date()
	today.setDate(today.getDate() + 2)
	const formattedDate = today.toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	})

	return (
		<div className='bg-white rounded-lg shadow-md  p-6 relative h-max'>
			<div className='text-3xl font-semibold'>
				{convertPrice(product.price)}
			</div>
			<div className='mt-2'>
				$6.88 Shipping
				<Link href='/' className='text-aqua font-semibold ml-2 '>
					Details
				</Link>
			</div>
			<span className='opacity-50 mt-1 text-sm block'>
				Sales taxes may apple at checkout
			</span>
			<div className='mt-4 text-sm '>
				<span className='opacity-50 mr-1 '>Delivery </span>
				{formattedDate}
			</div>
			<AddToCartInline product={product} />
			<p className='flex items-center mt-2 opacity-40 text-sm'>
				<Lock className='mr-2' /> Secure transaction
			</p>
			<div className='absolute top-6 right-6'>
				<FavoriteButton productId={product.id} />
			</div>
		</div>
	)
}
