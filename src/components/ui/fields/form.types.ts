export interface IQueriesResult<T, K> {
	isLoading?: boolean
	isNeedResetForm?: boolean
	data?: T
	onSubmit: K
}
export type TypeForm = 'create' | 'edit' | TypeFormUpdateProfile
export type TypeFormUpdateProfile = 'update-profile'
