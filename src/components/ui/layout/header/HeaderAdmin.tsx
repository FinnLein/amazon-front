'use client'

import cn from 'clsx'
import { m } from 'framer-motion'
import { FC } from 'react'

import Logo from './Logo'

interface Props {
	className?: string
}

const HeaderAdmin: FC<Props> = ({ className }) => {
	return (
		<m.header
			initial={{ translateY: -250 }}
			animate={{ translateY: 0 }}
			transition={{ stiffness: 200, delay: 0.1, type: 'spring' }}
			className={cn('bg-secondary py-6 px-6 ', className)}
		>
			<div className=''>
				<Logo />
			</div>
		</m.header>
	)
}

export default HeaderAdmin
