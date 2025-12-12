import { TypeForm } from '../form.types'

export function CategoryHeading({
	type,
	name
}: {
	type: TypeForm
	name: string
}) {
	switch (type) {
		case 'edit':
			return `Editing ${name}`
		case 'create':
			return 'Creating category'
	}
}
