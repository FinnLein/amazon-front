import Image from 'next/image'

import { TProduct } from '@/types/product.type'

import { SERVER_URL } from '@/constants/main.constants'

export function SingleProduct({ data }: { data: TProduct }) {
	return (
		<div>
			<div className='mb-10'>
				<Image
					alt='Product'
					src={
						data.images[0].includes('http')
							? data.images[0]
							: SERVER_URL + data.images[0]
					}
					width={300}
					height={300}
				/>
			</div>
			<div className='flex flex-col gap-5'>
				{data.reviews.map(r => (
					<div className='bg-white p-5'>{r.text}</div>
				))}
			</div>
		</div>
	)
}
