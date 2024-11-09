'use client'

import Slider from 'rc-slider'
import { useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

interface IRange {
	min?: number
	max: number
	fromInitialValue?: number
	toInitialValue?: number
	onChangeFromValue: (value: number) => void
	onChangeToValue: (value: number) => void
}

export default function Range({
	min = 0,
	max,
	fromInitialValue = 0,
	toInitialValue = max,
	onChangeFromValue,
	onChangeToValue
}: IRange) {
	const [fromValue, setFromValue] = useState(fromInitialValue)
	const [toValue, setToValue] = useState(toInitialValue)

	const debouncedFromValue = useDebounce(fromValue, 500)
	const debouncedToValue = useDebounce(toValue, 500)

	useEffect(() => {
		onChangeFromValue(debouncedFromValue)
	}, [debouncedFromValue])

	useEffect(() => {
		onChangeToValue(debouncedToValue)
	}, [debouncedToValue])

	return (
		<div className='w-full px-1'>
			<Slider
				range
				min={min}
				max={max}
				defaultValue={[fromInitialValue, toInitialValue]}
				onChange={value => {
					if (typeof value === 'object') {
						setFromValue(value[0])
						setToValue(value[1])
					}
				}}
			/>
			<div className='flex justify-between text-base mt-2'>
				<span>От ${fromInitialValue}</span>
				<span>До ${toInitialValue}</span>
			</div>
		</div>
	)
}
