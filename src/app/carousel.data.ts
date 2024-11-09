import { ICarouselItem } from '@/ui/carousel/carousel.interface'

import dots from '@/assets/images/dots.png'
import tech from '@/assets/images/technology.png'

export const carouselItems: ICarouselItem[] = [
	{
		title: 'Free Delivery',
		description:
			'Don`t miss it out! Only today, get free Next Day delivery on all of your orders.',
		image: tech
	},
	{
		title: 'New products',
		description: 'New products are already waiting for you on our shelves.',
		image: dots
	}
]
