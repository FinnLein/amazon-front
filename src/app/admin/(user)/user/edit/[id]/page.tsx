import { UserForm } from '../../../../../../components/ui/fields/user-form/UserForm'



export default function UpdateUserPage({
	params: { id }
}: {
	params: { id: string }
}) {
	return <UserForm type='edit' id={id} />
}
