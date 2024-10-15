import { CircleChevronLeft, CircleChevronRight } from 'lucide-react'
import { FC } from 'react'
import Button from './button/Button'
import { Loader } from './Loader'

interface Props {
	onLoadMore: () => void
	isLoading: boolean
	type?: 'left' | 'right' | 'text'
	className?: string
}

const ShowMore: FC<Props> = ({ onLoadMore, isLoading, type, className }) => {
	return (
		<div className='text-center mt-5'>
			<Button
				variant='white'
				size='sm'
				onClick={onLoadMore}
				disabled={isLoading}
				className={className}
			>
				{isLoading ? (
					<Loader />
				) : type === 'left' ? (
					<CircleChevronLeft />
				) : type === 'text' ? (
					'Show more'
				) : (
					<CircleChevronRight />
				)}
			</Button>
		</div>
	)
}

export default ShowMore
