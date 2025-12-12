'use client'

import type { FC } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import Heading from '@/ui/Heading'
import { Loader } from '@/ui/Loader'
import Button from '@/ui/button/Button'

import styles from './Auth.module.scss'
import AuthButtons from './AuthButtons'
import { AuthFormLoginFields } from './AuthFormLoginFields'
import { AuthFormRegisterFields } from './AuthFormRegisterFields'
import { useAuthForm } from './useAuthForm'

interface Props {
	isLogin: boolean
}

const Auth: FC<Props> = ({ isLogin }) => {
	const {
		handleSubmit,
		onSubmit,
		isPending,
		formRegister,
		errors,
		recaptchaRef
	} = useAuthForm(isLogin)

	return (
		<section className='flex h-screen'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='rounded-lg bg-white shadow-sm p-14 m-auto flex flex-col items-center'
			>
				<div>
					<Heading className='capitalize text-center'>
						{isLogin ? 'Login' : 'Registration'}
					</Heading>

					{isPending ? (
						<Loader />
					) : (
						<div className=''>
							<div className='mb-5'>
								{isLogin ? (
									<AuthFormLoginFields
										errors={errors}
										register={formRegister}
									/>
								) : (
									<AuthFormRegisterFields
										errors={errors}
										register={formRegister}
									/>
								)}
							</div>
							<ReCAPTCHA
								ref={recaptchaRef}
								size='normal'
								sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
								theme='light'
								className={styles.recaptcha}
							/>
							<Button variant='orange' className='mx-auto block'>
								{isPending ? <Loader /> : isLogin ? 'Login' : 'Register'}
							</Button>
							<AuthButtons isLogin={isLogin} />
						</div>
					)}
				</div>
			</form>
		</section>
	)
}

export default Auth
