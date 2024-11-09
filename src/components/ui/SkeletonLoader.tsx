import cn from 'clsx'

export function SkeletonLoader({
	length,
	className
}: {
	length: number
	className?: string
}) {
	return (
		<div className={cn('grid', className)}>
			{Array.from({ length: length }).map((_, index) => (
				<div
					key={index}
					className='animate-pulse bg-black-700 rounded-lg h-56 w-full'
				>
					<div className='h-full w-full bg-black-900 rounded-lg'></div>
				</div>
			))}
		</div>
	)
}
