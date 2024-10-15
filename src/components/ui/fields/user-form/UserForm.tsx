'use client'

import { IUserForm } from './user-form.types'
import { UserEditingForm } from './UserEditingForm'
import { useUserQueries } from './useUserQueries'

export function UserForm({ id, type }: Pick<IUserForm, 'id' | 'type'>) {
	const result = useUserQueries(id, type === 'create')

	return <UserEditingForm queriesResult={result} type={type} id={id} />
}
