import Button from '../button/Button'

interface IPagination {
	numberPages: number
	changePage: (page: string) => void
	currentPage?: string
}

export function Pagination({
	numberPages,
	changePage,
	currentPage
}: IPagination) {
	return (
		<div className='text-center mt-16'>
			{Array.from({ length: numberPages > 1 ? Math.ceil(numberPages) : 1 }).map(
				(_, index) => {
					const pageNumber = (index + 1).toString()

					return (
						<Button
							className='mx-2.5'
							variant={currentPage === pageNumber ? 'orange' : 'white'}
							size='sm'
							onClick={() => changePage(pageNumber)}
							disabled={currentPage === pageNumber}
							key={pageNumber}
						>
							{pageNumber}
						</Button>
					)
				}
			)}
		</div>
	)
}
