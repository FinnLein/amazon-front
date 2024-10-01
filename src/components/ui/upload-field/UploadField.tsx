import { CSSProperties } from 'react'
interface IUploadField {
	folder?: string
	value?: string
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	style?: CSSProperties
	isNoImage?: boolean
}

import { SERVER_URL } from '@/constants/main.constants'
import Image from 'next/image'
import { FC } from 'react'
import { FieldError } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { useUpload } from './useUpload'

const UploadField: FC<IUploadField> = ({
	folder,
	value,
	onChange,
	placeholder,
	error,
	style,
	isNoImage = false
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)

	return (
		<div style={style}>
			<div>
				<label>
					<div className='mb-2'>{placeholder}</div>
					<input type='file' onChange={uploadFile} />
					{error && <div className='text-red'>{error.message}</div>}
				</label>
				{!isNoImage && (
					<div>
						{isLoading ? (
							<Skeleton count={1} className='w-full h-full' />
						) : (
							value && (
								<Image
									alt=''
									className='rounded-md mt-3'
									src={value.includes('http') ? value : SERVER_URL + value}
									width={100}
									height={100}
								/>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
