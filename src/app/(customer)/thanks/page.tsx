import { Metadata, NextPage } from 'next'
import Link from 'next/link'

import Heading from '@/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = { title: 'Thanks!', ...NO_INDEX_PAGE }

const ThanksPage: NextPage = () => {
	return (
		<>
			<Heading>Спасибо, заэбал!</Heading>
			<Link href='/'>Вернуться</Link>
		</>
	)
}

export default ThanksPage
