'use server'

import { redirect } from 'next/navigation'

import { PUBLIC_PAGES } from '@/config/pages/public.config'

import { UserRole } from '@/types/user.interface'

import { getServerAuth } from '@/utils/server/get-server-auth'

import { IUserDataState } from '../transform-user-to-state'

import NotFound from '@/app/not-found'

type RoleCheckFunction = (user: IUserDataState) => boolean

const roleChecks: Partial<Record<UserRole, RoleCheckFunction>> = {
	[UserRole.ADMIN]: (user: IUserDataState) => user.isAdmin,
	[UserRole.PREMIUM]: (user: IUserDataState) => user.isPremium,
	[UserRole.MANAGER]: (user: IUserDataState) => user.isManager
}

type TRoles = UserRole[] | UserRole

export const protectPage = async (roles: TRoles = UserRole.USER) => {
	const rolesArray = Array.isArray(roles) ? roles : [roles]

	const user = await getServerAuth()

	if (!user) {
		return rolesArray.includes(UserRole.ADMIN)
			? NotFound()
			: redirect(PUBLIC_PAGES.LOGIN)
	}

	for (const role of rolesArray) {
		const checkRole = roleChecks[role]
		if (checkRole && !checkRole(user)) {
			if (role === UserRole.PREMIUM) {
				return redirect(PUBLIC_PAGES.HOME)
			} else {
				return NotFound()
			}
		}
	}
}
