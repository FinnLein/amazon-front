import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IAuthFormData, TUser } from '@/types/user.type'

import { AuthorizationType } from '@/utils/enums/authoristaionType.enums'

import { IAuthResponse } from './user.interface'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

interface IUserStore {
	user: TUser | null
	isLoading: boolean
	error: null | null
	register: (data: IAuthFormData, token?: string | null) => Promise<void>
	login: (data: IAuthFormData, token?: string | null) => Promise<void>
	logout: () => void
}
export const useUserStore = create<IUserStore>()(
	devtools(
		persist(
			set => ({
				user: null,
				isLoading: false,
				error: null,
				register: async (data: IAuthFormData, token?: string | null) => {
					set({ isLoading: true })
					try {
						const res: IAuthResponse = await AuthService.main(
							AuthorizationType.register,
							data,
							token
						)
						set({ user: res.user, isLoading: false })
					} catch (error) {
						set({ error: error.message, isLoading: false })
					} finally {
						set({ isLoading: false })
					}
				},
				login: async (data: IAuthFormData, token?: string | null) => {
					set({ isLoading: true })
					try {
						const res: IAuthResponse = await AuthService.main(
							AuthorizationType.login,
							data,
							token
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
				}
			}),
			{ name: 'user' }
		)
	)
)
