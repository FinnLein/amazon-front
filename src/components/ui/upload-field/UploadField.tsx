import Image from 'next/image'
import { FC } from 'react'
import { FieldError } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'

import { useUpload } from './useUpload'
import { SERVER_URL } from '@/constants/main.constants'

interface IUploadField {
	folder?: string
	value?: string | string[]
	onChange: (...event: any[]) => void
	placeholder: string
	error?: FieldError
	className?: string
	isNoImage?: boolean
	isMultiple: boolean
}

const UploadField: FC<IUploadField> = ({
	folder,
	value,
	onChange,
	placeholder,
	error,
	className,
	isNoImage = false,
	isMultiple
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, isMultiple, folder)

	const renderImages = () => {
		if (Array.isArray(value)) {
			return value.map((val, index) => (
				<Image
					key={index}
					alt=''
					className='rounded-md mt-3'
					src={val.includes('http') ? val : SERVER_URL + val}
					width={100}
					height={100}
				/>
			))
		} else if (typeof value === 'string') {
			return (
				<Image
					alt=''
					className='rounded-md mt-3'
					src={value.includes('http') ? value : SERVER_URL + value}
					width={100}
					height={100}
				/>
			)
		}
	}

	return (
		<div className={className}>
			<div>
				<label>
					<div className='mb-2'>{placeholder}</div>
					<label
						className='cursor-pointer text-black-700 rounded-lg p-2 bg-white'
						htmlFor='file'
					>
						Choose file to upload
					</label>

					<input
						className='hidden'
						id='file'
						type='file'
						multiple={isMultiple === true ? true : false}
						onChange={uploadFile}
					/>
					{error && <div className='text-red'>{error.message}</div>}
				</label>
				{!isNoImage && (
					<div>
						{isLoading ? (
							<Skeleton count={1} className='w-full h-full' />
						) : (
							value && <div className='flex gap-5'>{renderImages()}</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
