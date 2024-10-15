import ReactSelect, { OnChangeValue } from 'react-select'
import makeAnimated from 'react-select/animated'

import '../../../assets/styles/react-select.scss'

import { IOption, ISelect } from './select.interface'

const animatedComponents = makeAnimated()

export function Select({
	isLoading,
	isMulty,
	field,
	options,
	placeholder,
	error
}: ISelect) {
	const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulty
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulty
				? options.filter(option => field.value.indexOf(option.value) >= 0)
				: options.find(option => option.value === field.value)
		} else return isMulty ? [] : ('' as any)
	}

	return (
		<div className='relative'>
			<label>
				<ReactSelect
					options={options}
					value={getValue()}
					onChange={onChange}
					placeholder={''}
					isMulti={isMulty}
					closeMenuOnSelect
					isLoading={isLoading}
					components={animatedComponents}
					classNamePrefix={'custom-select'}
				/>
			</label>
		</div>
	)
}
