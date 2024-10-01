import { Metadata } from 'next'
import { UserForm } from '../../fields/UserForm'

export const metaData: Metadata = {
	title: 'Editing user'
}

export default function UpdateUserPage({
	params: { id }
}: {
	params: { id: string }
}) {
	return <UserForm type='edit' id={id} />
}
