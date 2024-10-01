import { TypeUserForm } from './user-form.types'

export function UserFormHeading({
	type,
	email
}: {
	type: TypeUserForm
	email?: string
}) {
	switch (type) {
		case 'create':
			return 'Creating user'
		case 'edit':
			return `Editing ${email}`

		default:
			return 'Editing profile'
	}
}
