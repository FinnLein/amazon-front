import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'

import { AuthService } from '@/services/auth/auth.service'

type Props = {
	color?: 'black' | 'white'
	className?: string
}

const Logout: FC<Props> = ({ color, className }) => {

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => AuthService.logout(),
		onSuccess: () => {
			push('/')
		}
	})

	const handleClick = () => {
		mutate()
	}

	return (
		<>
			<button
				className={cn('flex items-center', className, {
					'text-secondary': color === 'black',
					'text-white': color === 'white'
				})}
				onClick={handleClick}
				type='button'
			>
				<FiLogOut />
				<span className='ml-2'>Logout</span>
			</button>
		</>
	)
}

export default Logout
