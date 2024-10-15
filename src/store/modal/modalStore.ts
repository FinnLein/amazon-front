import { create } from 'zustand'

interface IModal {
	isActive: boolean
	setIsActive: (e: boolean) => void
}

export const useModalStore = create<IModal>(set => ({
	isActive: false,
	setIsActive: () => set(state => ({ isActive: !state.isActive }))
}))
