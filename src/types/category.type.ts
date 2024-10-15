export type TCategory = {
	id: string
	name: string
	slug: string
	description: string
}

export interface ICategoryData extends Omit<TCategory, 'id'> {}
