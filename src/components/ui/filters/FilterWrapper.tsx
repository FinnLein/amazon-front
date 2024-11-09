import { PropsWithChildren } from 'react'

export function FilterWrapper({
	title,
	children
}: PropsWithChildren<{ title: string }>) {
	return (
		<div className='mb-6'>
			<div className='mb-3 font-semibold text-lg'>{title}</div>
			<div>{children}</div>
		</div>
	)
}
