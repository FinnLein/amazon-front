'use client'

import { IUserForm } from '@/ui/fields/user-form/user-form.types'

import { ProfileEditingForm } from './ProfileEditingForm'
import { useProfileQueries } from './useProfileQueries'

export function ProfileForm({ type }: Pick<IUserForm, 'id' | 'type'>) {
	const result = useProfileQueries(true)

	return <ProfileEditingForm queriesResult={result} />
}
