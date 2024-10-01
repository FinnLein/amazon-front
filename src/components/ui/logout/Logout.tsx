import { useUserStore } from '@/store/user/userStore'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'
type Props = {
	color?: 'black' | 'white'
}

const Logout: FC<Props> = ({ color }) => {
	const { logout } = useUserStore()
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		//@ts-ignore
		mutationFn: () => logout(),
		onSuccess: () => {
			push('/')
		}
	})

	return (
		<>
			<button
				className={cn('flex items-center ml-10 my-10', {
					'text-secondary': color === 'black',
					'text-white': color === 'white'
				})}
				onClick={() => logout()}
				type='button'
			>
				<FiLogOut />
				<span className='ml-2'>Logout</span>
			</button>
		</>
	)
}

export default Logout
