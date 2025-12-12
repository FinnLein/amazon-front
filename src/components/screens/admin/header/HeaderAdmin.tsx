'use client'

import cn from 'clsx'
import type { FC } from 'react'

import Logo from '../../../ui/layout/header/Logo'

interface Props {
	className?: string
}

const HeaderAdmin: FC<Props> = ({ className }) => {
	return (
		<header className={cn('bg-secondary py-6 px-6 ', className)}>
			<div className=''>
				<Logo />
			</div>
		</header>
	)
}

export default HeaderAdmin
