export interface IBrand {
	id: string
	name: string
	slug: string
}

export interface IBrandData extends Omit<IBrand, 'id'> {}
