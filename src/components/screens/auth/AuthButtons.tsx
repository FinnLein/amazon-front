import Link from 'next/link'
import type { FC } from 'react'

interface IProps {
	isLogin: boolean
}

const AuthButtons: FC<IProps> = ({ isLogin }) => {
	return (
		<div className='text-sm mt-5 '>
			{isLogin ? (
				<div className='flex justify-between'>
					<span>First time here?</span>
					<Link className='text-primary' href='/register'>
						Register
					</Link>
				</div>
			) : (
				<div className='flex justify-between'>
					<span>Account already exists?</span>
					<Link className='text-primary' href='/login'>
						Login
					</Link>
				</div>
			)}
		</div>
	)
}

export default AuthButtons
