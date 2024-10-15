import { FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

import Field from '@/ui/input/Field'

interface ISlugField {
	register: UseFormRegister<any>
	error?: FieldError
	generate: () => void
	placeholder: string
}

const SlugField: FC<ISlugField> = ({
	register,
	error,
	generate,
	placeholder
}) => {
	return (
		<div className='relative'>
			<Field
				placeholder={placeholder}
				error={error}
				{...register('slug', {
					required: 'slug is required'
				})}
			/>
			<div
				className='uppercase text-black-700 absolute top-0 right-0 cursor-pointer rounded-lg py-0.5 px-2 transition-colors text-xs '
				onClick={generate}
			>
				generate
			</div>
		</div>
	)
}

export default SlugField
