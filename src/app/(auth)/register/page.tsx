import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Auth from '@/screens/auth/Auth'
import { Metadata, NextPage } from 'next'

export const metadata: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
}

const RegisterPage: NextPage = () => {
	return <Auth isLogin={false} />
}

export default RegisterPage
