import parse from 'html-react-parser'

export function ProductDescription({ description }: { description: string }) {
	return (
		<div className='opacity-80 font-light w-96 mt-10'>
			<div className='font-semibold mb-1'>Description:</div>
			{parse(description)}
		</div>
	)
}
