import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { IEmailPassword } from '@/store/user/user.interface'
import { useUserStore } from '@/store/user/userStore'
import Button from '@/ui/button/Button'
import Heading from '@/ui/Heading'
import Field from '@/ui/input/Field'
import Loader from '@/ui/Loader'
import { capitaliseFirstLetter } from '@/utils/capitaliseFirstLetter'
import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { validEmail } from './valid-email'

const Auth: FC = () => {
	useAuthRedirect()
	const { register, login } = useUserStore()
	const {
		register: formRegister,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IEmailPassword>({ mode: 'onChange' })
	const { isLoading } = useUserStore()

	const [type, setType] = useState<
		AuthorizationType.login | AuthorizationType.register
	>(AuthorizationType.login)

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === AuthorizationType.login) login(data)
		else register(data)

		reset()
	}

	return (
		<section className='flex h-screen'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='rounded-lg bg-white shadow-sm p-14  m-auto flex flex-col items-center'
			>
				<Heading className='capitalize text-center mb-3'>{type}</Heading>

				{isLoading ? (
					<Loader />
				) : (
					<>
						<Field
							placeholder='Email'
							error={errors.email?.message}
							{...formRegister('email', {
								required: 'Email is required',
								pattern: {
									value: validEmail,
									message: 'please enter a valid email address'
								}
							})}
						/>
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
						<Button className="justify-center" variant='orange'>Let's go!</Button>

						<div>
							<button
								type='button'
								className='inline-block opacity-20 mt-3 text-sm'
								onClick={() =>
									setType(
										type === AuthorizationType.login
											? AuthorizationType.register
											: AuthorizationType.login
									)
								}
							>
								{type === AuthorizationType.login
									? capitaliseFirstLetter(AuthorizationType.register)
									: capitaliseFirstLetter(AuthorizationType.login)}
							</button>
						</div>
					</>
				)}
			</form>
		</section>
	)
}

export default Auth
