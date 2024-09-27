import { FC } from 'react'
import Button from './button/Button'
import Loader from './Loader'

interface Props {
	onLoadMore: () => void
	isLoading: boolean
}

const ShowMore: FC<Props> = ({ onLoadMore, isLoading }) => {
	return (
		<div className='text-center mt-5'>
			<Button variant='white' onClick={onLoadMore} disabled={isLoading}>
				{isLoading ? <Loader /> : 'Show more'}
			</Button>
		</div>
	)
}

export default ShowMore
