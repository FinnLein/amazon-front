import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { IAuthFormData } from '@/types/user.type'

import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'

import { AuthService } from '@/services/auth/auth.service'

export function useAuthForm(isLogin?: boolean) {
	const router = useRouter()

	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const {
		register: formRegister,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthFormData>({ mode: 'onChange' })

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFormData) =>
			AuthService.main(
				AuthorizationType.login,
				data,
				recaptchaRef?.current?.getValue()
			),
		onSuccess() {
			reset()
			router.push('/')
			toast.success('Login successful')
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error?.response?.data.message)
			}
		}
	})

	const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthFormData) =>
			AuthService.main(
				AuthorizationType.register,
				data,
				recaptchaRef?.current?.getValue()
			),
		onSuccess() {
			reset()
			router.push('/')
			toast.success('Register successful')
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				toast.error(error.response?.data.message)
			}
		}
	})

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		const token = recaptchaRef?.current?.getValue()

		if (!token) {
			toast.error('Enter recaptcha')
			return
		}

		isLogin ? mutateLogin(data) : mutateRegister(data)
		reset()
	}

	const isPending = isLoginPending || isRegisterPending

	return {
		onSubmit,
		isPending,
		errors,
		handleSubmit,
		mutateLogin,
		mutateRegister,
		formRegister,
		recaptchaRef
	}
}
