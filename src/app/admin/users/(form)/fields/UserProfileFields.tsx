import UploadField from '@/ui/upload-field/UploadField'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { IUserFormState } from '../user-form.types'

export function UserProfileFields({
	control,
	register
}: {
	control: Control<IUserFormState, any>
	register: UseFormRegister<IUserFormState>
}) {
	return (
		<div className='grid min-lg:grid-cols-2 gap-8 mt-5'>
			<div>
				<Controller
					control={control}
					{...register('avatarPath')}
					name='avatarPath'
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<UploadField
							onChange={onChange}
							value={value}
							error={error}
							folder='users'
							placeholder='Avatar'
						/>
					)}
				/>
			</div>
		</div>
	)
}
