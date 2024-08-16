import { EnumProductSort } from '@/services/product/productSort.enum'
import { FC } from 'react'
import ReactSelect, { ActionMeta, MultiValue, SingleValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { IOption, ISelect } from './select.interface'

const Select: FC<ISelect> = ({ sortType, setSortType }) => {
	const options: IOption[] = Object.keys(EnumProductSort).map(key => ({
		label: key,
		value: EnumProductSort[key as keyof typeof EnumProductSort]
	}))

	const animatedComponents = makeAnimated()

	const onChange = (
		newValue: SingleValue<IOption> | MultiValue<IOption>,
		actionMeta: ActionMeta<IOption>
	  ) => {
		if (Array.isArray(newValue)) {
		  // Обработка множественного выбора
		  // Например, вы можете выбрать первое значение из массива
		  if (newValue.length > 0) {
			setSortType(newValue[0].value);
		  }
		} else if (newValue) {
		  // Обработка одиночного выбора
		  setSortType(newValue.value);
		}
	  };

	const getValue = () => {
		return sortType ? options.find(sort => sort.value === sortType) : null
	}

	return (
		<div className='relative mb-8 animate-fade '>
			<ReactSelect
				classNamePrefix='custom-select'
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						borderColor: state.isFocused ? '#FF9902' : '#161D25'
					})
				}}
				options={options}
				components={animatedComponents}
				onChange={onChange}
				value={getValue()}
			/>
		</div>
	)
}

export default Select
