import Link from 'next/link'
import { FC } from 'react'

interface IProps {
	isLogin: boolean
}

const AuthButtons: FC<IProps> = ({ isLogin }) => {
	return (
		<div className='text-sm mt-5'>
			{isLogin ? (
				<div>
					<span>First time here?</span>
					<Link className='text-primary' href='/register'>
						Register
					</Link>
				</div>
			) : (
				<div>
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
