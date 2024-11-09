export interface ICategory {
	id: string
	name: string
	slug: string
	description: string
}

export interface ICategoryData extends Omit<ICategory, 'id'> {}
