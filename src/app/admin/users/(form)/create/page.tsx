import { Metadata } from 'next'
import { UserForm } from '../fields/UserForm'

export const metaData: Metadata = {
	title: 'Creating user'
}

export default function CreateUserPage() {
	return <UserForm type='create' />
}
