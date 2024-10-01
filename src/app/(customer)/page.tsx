import Home from '@/screens/home/Home'
import { Metadata, NextPage } from 'next'

export const metaData: Metadata = {
	title: 'Home',
	description:
		'Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime.'
}

const HomePage: NextPage = () => {
	return <Home />
}

export default HomePage
