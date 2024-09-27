import Heading from '@/ui/Heading'
import { NextPage } from 'next'
import Link from 'next/link'

const ThanksPage: NextPage = () => {
	return (
		<>
			<Heading>Спасибо, заэбал!</Heading>
			<Link href='/'>Вернуться</Link>
		</>
	)
}

export default ThanksPage
