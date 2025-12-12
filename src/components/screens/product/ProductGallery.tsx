'use client'

import cn from 'clsx'
import { StepBack, StepForward } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { SERVER_URL } from '@/constants/main.constants'

export function ProductGallery({ images }: { images: string[] }) {
	const [activeIndex, setActiveIndex] = useState(0)
	const [showArrows, setShowArrows] = useState(false)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(false)
	const galleryRef = useRef<HTMLDivElement>(null)

	const checkScrollButtons = () => {
		if (galleryRef.current) {
			setCanScrollLeft(galleryRef.current.scrollLeft > 0)
			setCanScrollRight(
				galleryRef.current.scrollLeft + galleryRef.current.clientWidth <
					galleryRef.current.scrollWidth
			)
		}
	}

	useEffect(() => {
		checkScrollButtons()
		window.addEventListener('resize', checkScrollButtons)

		return () => {
			window.removeEventListener('resize', checkScrollButtons)
		}
	}, [images])

	const handleScrollLeft = () => {
		const newIndex = activeIndex > 0 ? activeIndex - 1 : 0
		setActiveIndex(newIndex)
	}

	const handleScrollRight = () => {
		const newIndex =
			activeIndex < images.length - 1 ? activeIndex + 1 : images.length - 1
		setActiveIndex(newIndex)
	}

	const scrollLeft = () => {
		if (galleryRef.current) {
			galleryRef.current.scrollBy({ left: -100, behavior: 'smooth' })
			checkScrollButtons()
		}
	}

	const scrollRight = () => {
		if (galleryRef.current) {
			galleryRef.current.scrollBy({ left: 100, behavior: 'smooth' })
			checkScrollButtons()
		}
	}
	return (
		<div className=''>
			<div
				className='relative w-[400px]'
				onMouseEnter={() => setShowArrows(true)}
				onMouseLeave={() => setShowArrows(false)}
			>
				<Image
					src={
						images[activeIndex].includes('http')
							? images[activeIndex]
							: SERVER_URL + images[activeIndex]
					}
					alt=''
					width={400}
					height={400}
					className='rounded-lg overflow-hidden relative'
					priority
					draggable={false}
				/>
				{showArrows && (
					<div className='opacity-50'>
						{activeIndex > 0 && (
							<button
								onClick={handleScrollLeft}
								className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10'
							>
								<StepBack />
							</button>
						)}

						{activeIndex < images.length - 1 && (
							<button
								onClick={handleScrollRight}
								className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10'
							>
								<StepForward />
							</button>
						)}
					</div>
				)}
			</div>
			<div className='flex z-10 w-[400px] items-center mt-6 '>
				{canScrollLeft && (
					<button
						onClick={scrollLeft}
						className='mr-2 p-2 bg-gray-300 opacity-50 rounded-full'
					>
						<StepBack />
					</button>
				)}

				<div
					ref={galleryRef}
					className='w-full overflow-x-auto whitespace-nowrap'
				>
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => setActiveIndex(index)}
							className={cn(
								'duration-300 h-40 hover:shadow-md mr-5 last:mr-0 border-b-2 border-solid transition-all rounded-lg overflow-hidden inline-block',
								{
									'shadow-md border-primary': index === activeIndex,
									'border-transparent': index !== activeIndex
								}
							)}
						>
							<Image
								src={image.includes('http') ? image : SERVER_URL + image}
								draggable={false}
								alt=''
								objectFit='cover'
								priority
								width={100}
								height={100}
							/>
						</button>
					))}
				</div>
				{canScrollRight && (
					<button
						onClick={scrollRight}
						className='ml-2 p-2 bg-gray-300 opacity-50 rounded-full'
					>
						<StepForward />
					</button>
				)}
			</div>
		</div>
	)
}
