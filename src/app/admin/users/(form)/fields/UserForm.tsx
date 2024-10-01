'use client'

import { IUserForm } from '../user-form.types'
import { useUserQueries } from '../useUserQueries'
import { UserEditingForm } from './UserEditingForm'

export function UserForm({ id, type }: Pick<IUserForm, 'id' | 'type'>) {
	const result = useUserQueries(id, type === 'create')

	return <UserEditingForm queriesResult={result} type={type} id={id} />
}
