// 'use client'

// import cn from 'clsx'
// import Link from 'next/link'
// import { TransitionGroup } from 'react-transition-group'

// import { PUBLIC_PAGES } from '@/config/pages/public.config'

// import { useCarouselStore } from '@/store/carousel/carouselStore'

// import CSSTransition from '../CSSTransitionGroup'

// import styles from './Carousel.module.scss'
// import { CarouselNavigation } from './CarouselNavigations'
// import { ICarouselItem } from './carousel.interface'

// interface ICarousel {
// 	items: ICarouselItem[]
// 	className?: string
// }

// export function Carousel({ items, className }: ICarousel) {
// 	const { selectedItemIndex } = useCarouselStore()
// 	const selectedItem = items[selectedItemIndex]

// 	return (
// 		<section className={cn(className, 'relative')}>
// 			<CarouselNavigation />
// 			<TransitionGroup className='relative h-56'>
// 				<CSSTransition
// 					key={selectedItem.title}
// 					timeout={5}
// 					className={{
// 						enter: styles['item-enter'],
// 						enterActive: styles['item-enter-active'],
// 						exit: styles['item-exit'],
// 						exitActive: styles['item-exit-active']
// 					}}
// 					unmountOnExit
// 					mountOnEnter
// 				>
// 					<div
// 						className={styles.item}
// 						style={
// 							selectedItem.image
// 								? { backgroundImage: `url(${selectedItem.image})` }
// 								: {}
// 						}
// 					>
// 						<h2>{selectedItem.title}</h2>
// 						<p>{selectedItem.description}</p>
// 						{selectedItem.href ? (
// 							<Link href={selectedItem.href} className='btn btn-white'>
// 								Read more
// 							</Link>
// 						) : (
// 							<Link href={PUBLIC_PAGES.EXPLORER} className='btn btn-white'>
// 								Browse products
// 							</Link>
// 						)}
// 					</div>
// 				</CSSTransition>
// 			</TransitionGroup>
// 		</section>
// 	)
// }
