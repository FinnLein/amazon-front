import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ISidebarStore {
	isRolledUp: boolean
	toggleIsRolledUp: () => void
}

export const useSidebarStore = create<ISidebarStore>()(
	persist(
		set => ({
			isRolledUp: false,
			toggleIsRolledUp: () =>
				set(state => ({
					isRolledUp: !state.isRolledUp
				}))
		}),
		{ name: 'sidebar-storage' }
	)
)
