import { StaticImageData } from 'next/image'

export interface ICarouselItem {
	title: string
	description: string
	image?: StaticImageData
	href?: string
}
