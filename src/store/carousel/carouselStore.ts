import { create } from 'zustand'

interface ICarouselState {
	selectedItemIndex: number
	nextSlide: (carouselLength: number) => void
	prevSlide: () => void
	selectSlide: (index: number) => void
}

export const useCarouselStore = create<ICarouselState>(set => ({
	selectedItemIndex: 0,
	nextSlide: carouselLength =>
		set(state => ({
			selectedItemIndex:
				state.selectedItemIndex !== carouselLength - 1
					? state.selectedItemIndex + 1
					: 0
		})),
	prevSlide: () =>
		set(state => ({
			selectedItemIndex:
				state.selectedItemIndex > 0
					? state.selectedItemIndex - 1
					: state.selectedItemIndex
		})),
	selectSlide: index => set({ selectedItemIndex: index })
}))
