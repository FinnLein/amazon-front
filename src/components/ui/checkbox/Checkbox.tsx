import cn from 'clsx'
import { PropsWithChildren } from 'react'

import styles from './Checkbox.module.scss'

interface ICheckbox {
	isChecked: boolean
	onClick: () => void
	className?: string
}
export function Checkbox({
	isChecked,
	onClick,
	className,
	children
}: PropsWithChildren<ICheckbox>) {
	return (
		<button onClick={onClick} className={cn(styles.checkbox, className)}>
			<span
				className={cn({
					[styles.active]: isChecked
				})}
			/>
			<span>{children}</span>
		</button>
	)
}
