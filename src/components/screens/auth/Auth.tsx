'use client'

import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { useUserStore } from '@/store/user/userStore'
import { IAuthFormData } from '@/types/user.type'
import Button from '@/ui/button/Button'
import Heading from '@/ui/Heading'
import Field from '@/ui/input/Field'
import { Loader } from '@/ui/Loader'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { validEmail } from './valid-email'
import { validPhone } from './valid-phone'

interface Props {
	isLogin: boolean
}

const Auth: FC<Props> = ({ isLogin }) => {
	useAuthRedirect()
	const router = useRouter()
	const { login, register } = useUserStore()

	const {
		register: formRegister,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthFormData>({ mode: 'onChange' })

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFormData) => login(data),
		onSuccess() {
			reset()
			router.push('/')
			toast.success('Login succesful')
		},
		onError: error => {
			toast.error(error.message)
		}
	})
	const {
		error,
		mutate: mutateRegister,
		isPending: isRegisterPending
	} = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthFormData) => register(data),
		onSuccess() {
			reset()
			router.push('/')
			toast.success('Register succesful')
		},
		onError: error => {
			toast.error(error.message)
		}
	})

	const isPending = isLoginPending || isRegisterPending

	const onSubmit: SubmitHandler<IAuthFormData> = data => {
		isLogin ? mutateLogin(data) : mutateRegister(data)
		reset()
	}

	return (
		<section className='flex h-screen'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='rounded-lg bg-white shadow-sm p-14  m-auto flex flex-col items-center'
			>
				<Heading className='capitalize text-center mb-3'>
					{isLogin ? 'Login' : 'Registration'}
				</Heading>

				{isPending ? (
					<Loader />
				) : (
					<>
					{isLogin ? <></> : <>
						<Field
							placeholder='Name'
							{...formRegister('name', {
								required: 'Name is required',
								minLength: {
									value: 6,
									message: 'Name should be at least 6 symbols'
								}
							})}
							error={errors.name?.message}
						/>
						{error && <p className='text-red'>{error.message}</p>}
						
						<Field 
							placeholder='Phone'
							{...formRegister('phone', {
								required: 'Phone is required',
								pattern: {
									value: validPhone,
									message: 'Please enter a valid phone number'
								}
							})}
							error={errors.phone?.message}
						/>
						{error && <p className='text-red'>{error.message}</p>}</>}
					
						<Field
							placeholder='Email'
							{...formRegister('email', {
								required: 'Email is required',
								pattern: {
									value: validEmail,
									message: 'Please enter a valid email address'
								}
							})}
							error={errors.email?.message}
						/>
						{error && <p className='text-red'>{error.message}</p>}
						<Field
							placeholder='Password'
							error={errors.password?.message}
							type='password'
							{...formRegister('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min lenght should be at least 6 symbols'
								}
							})}
						/>
						{error && <p className='text-red'>{error.message}</p>}

						<Button className='justify-center' variant='orange'>
							{isPending ? <Loader /> : isLogin ? 'Login' : 'Register'}
						</Button>
						<div className='text-sm mt-5'>
							{isLogin ? (
								<div>
									First time here?{' '}
									<Link className='text-primary' href='/register'>
										Register
									</Link>
								</div>
							) : (
								<div>
									Account already exists?{' '}
									<Link className='text-primary' href='/login'>
										Login
									</Link>
								</div>
							)}
						</div>
					</>
				)}
			</form>
		</section>
	)
}

export default Auth
