import ShowMore from '@/ui/ShowMore'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	isLoading: boolean
	setPage: Dispatch<SetStateAction<number>>
}

export function ManageUsersShowMore({ isLoading, setPage }: Props) {
	return (
		<ShowMore
			isLoading={isLoading}
			onLoadMore={() => setPage(prev => prev + 1)}
		/>
	)
}
