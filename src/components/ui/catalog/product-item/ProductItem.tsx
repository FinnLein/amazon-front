import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { getCategoryUrl, getProductUrl } from '@/config/configUrl'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './AddToCartButton'
import FavoriteButton from './FavoriteButton'
import ProductRating from './ProductRating'
import { SERVER_URL } from '@/constants/main.constants'

const ProductItem: FC<{ product: IProduct; index: number }> = ({
	product,
	index
}) => {
	return (
		<m.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.7 }}
			transition={{ ease: 'easeInOut' }}
			className='flex flex-col h-full bg-white overflow-hidden rounded-xl'
		>
			<div className='relative flex-shrink-0 flex-grow basis-auto'>
				<div className='absolute top-0 right-0 z-10 bg-white p-1 rounded-xl'>
					<FavoriteButton productId={product.id} />
					<AddToCartButton product={product} />
				</div>

				<Link href={getProductUrl(`${product.slug}`)}>
					<Image
						width={250}
						height={250}
						alt={product.name}
						src={
							product.images[0].includes('http')
								? product.images[0]
								: SERVER_URL + product.images[0]
						}
					/>
				</Link>
			</div>
			<div className='p-2 flex-shrink-0 flex-grow-0 basis-auto'>
				<Link href={getProductUrl(`${product.slug}`)}>
					<h3 className='mt-2 font-semibold	'>{product.name}</h3>
				</Link>
				<div className='flex justify-between'>
					<Link
						href={getCategoryUrl(product?.category?.slug)}
						className='text-aqua text-xs mb-2'
					>
						{product?.category?.name}
					</Link>
					<span className='text-xs mb-2'>{product?.brand?.name}</span>
				</div>

				<ProductRating product={product} isText />
				<div className='text-xl font-semibold'>
					{convertPrice(product.price)}
				</div>
			</div>
		</m.div>
	)
}

export default ProductItem
