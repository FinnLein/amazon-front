import { BsCaretLeftSquare, BsCaretRightSquare } from 'react-icons/bs'

import { useCarouselStore } from '@/store/carousel/carouselStore'

import styles from './Carousel.module.scss'

export function CarouselNavigation() {
	const { nextSlide, prevSlide } = useCarouselStore()

	return (
		<div className={styles.nav}>
			<button onClick={() => prevSlide()}>
				<BsCaretLeftSquare />
			</button>
			<button onClick={() => nextSlide(2)}>
				<BsCaretRightSquare />
			</button>
		</div>
	)
}
