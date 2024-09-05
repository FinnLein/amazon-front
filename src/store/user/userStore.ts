import { errorCatch } from '@/api/api.helper'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { TUser } from '@/types/user.type'
import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IAuthResponse, IEmailPassword } from './user.interface'

interface IUserStore {
	user: TUser | null
	isLoading: boolean
	error: null | null
	register: (data: IEmailPassword) => Promise<void>
	login: (data: IEmailPassword) => Promise<void>
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
				register: async (data: IEmailPassword) => {
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
				login: async (data: IEmailPassword) => {
					set({ isLoading: true })
					try {
						const res: IAuthResponse = await AuthService.main(
							AuthorizationType.login,
							data
						)
						set({ user: res.user, isLoading: false })
					} catch (error) {
						set({ error: error.message, isLoading: false })
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
						set({ user: res.data.user, isLoading: false })
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
