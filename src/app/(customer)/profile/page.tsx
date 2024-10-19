import { NextPage } from 'next'

import { UserRole } from '@/types/user.type'

import { protectPage } from '@/utils/server/protect-page'

import Profile from '@/screens/profile/Profile'

const ProfilePage: NextPage = async () => {
	await protectPage([UserRole.USER])

	return <Profile />
}

export default ProfilePage
