import { create } from 'zustand'

interface ISidebarStore {
	isRolledUp: boolean
	toggleIsRolledUp: () => void
}

export const useSidebarStore = create<ISidebarStore>(set => ({
	isRolledUp: false,
	toggleIsRolledUp: () =>
		set(state => ({
			isRolledUp: !state.isRolledUp
		}))
}))
