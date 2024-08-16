import cn from 'clsx'
import { forwardRef } from 'react'
import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ className, type = 'text', placeholder, error, style, Icon, ...rest },
		ref
	) => {
		return (
			<div className={cn('mb-4', className)} >
				<label>
					<span className='mb-1 block'>
						{Icon && <Icon className={'mr-3'} />}
						{placeholder}
					</span>
					<input
						className={cn(
							'px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all ease-in-out duration-300 placeholder:text-gray rounded-lg',
							{
								'border-red': !!error
							}
						)}
						placeholder={placeholder}
						ref={ref}
						type={type}
						{...rest}
					></input>
				</label>
				{error && <div className={'text-red mt-1 text-sm'}>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
