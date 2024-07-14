import { TUser } from "./user.type"

export type TReview = {
	id: number
	user: TUser
	createdAt: string
	text: string
	rating: string
}
