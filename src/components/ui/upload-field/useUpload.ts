import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { FileService } from '@/services/file/file.service'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	isMultiple: boolean,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, isMultiple, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation({
		mutationKey: ['upload file'],
		mutationFn: (data: FormData) => FileService.upload(data, folder),

		onSuccess: ({ data }) => {
			onChange(isMultiple ? data.map(i => i.url) : data[0].url)
		},
		onError: error => {
			toast.error(error.message)
		}
	})

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true)

			const files = e.target.files
			if (!files?.length) return
			const formData = new FormData()

			if (isMultiple) {
				for (let x = 0; x < files.length; x++) {
					formData.append('media', files[x])
				}
			} else {
				formData.append('media', files[0])
			}

			await mutateAsync(formData)
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadFile,
			isLoading
		}),
		[uploadFile, isLoading]
	)
}
