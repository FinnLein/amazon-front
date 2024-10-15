import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IAuthFormData, TUser } from '@/types/user.type'

import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'

import { errorCatch } from '@/api/api.helper'

import { IAuthResponse } from './user.interface'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

interface IUserStore {
	user: TUser | null
	isLoading: boolean
	error: null | null
	register: (data: IAuthFormData) => Promise<void>
	login: (data: IAuthFormData) => Promise<void>
	logout: () => void
	checkAuth: () => Promise<void>
}
export const useUserStore = create<IUserStore>()(
	devtools(
		persist(
			(set, get) => ({
				user: null,
				isLoading: false,
				error: null,
				register: async (data: IAuthFormData) => {
					set({ isLoading: true })
					try {
						const res: IAuthResponse = await AuthService.main(
							AuthorizationType.register,
							data
						)
						set({ user: res.user, isLoading: false })
					} catch (error) {
						set({ error: error.message, isLoading: false })
					} finally {
						set({ isLoading: false })
					}
				},
				login: async (data: IAuthFormData) => {
					set({ isLoading: true })
					try {
						const res: IAuthResponse = await AuthService.main(
							AuthorizationType.login,
							data
						)
						set({ user: res.user, isLoading: false })
					} catch (error) {
						set({ error: error.message, isLoading: false })
						debugger
					} finally {
						set({ isLoading: false })
					}
				},
				logout: () => {
					removeFromStorage()
					set({ user: null })
				},
				checkAuth: async () => {
					set({ isLoading: true })
					try {
						const res = await AuthService.getNewTokens()
						set({ user: res.user, isLoading: false })
					} catch (error) {
						if (errorCatch(error) === 'jwt expired') get().logout()
						set({ error: error.message, isLoading: false })
					} finally {
						set({ isLoading: false })
					}
				}
			}),
			{ name: 'user' }
		)
	)
)
