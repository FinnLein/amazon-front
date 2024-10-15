import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '../../../../assets/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link href='/'>
			<Image
				src={logoImage}
				fetchPriority='high'
				width={180}
				height={37}
				alt='Amazon'
			/>
		</Link>
	)
}

export default Logo
