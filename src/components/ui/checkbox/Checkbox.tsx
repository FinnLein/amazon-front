import cn from 'clsx'
import { Check } from 'lucide-react'
import type { PropsWithChildren } from 'react'

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
					[styles.active]: isChecked,
					[styles.inActive]: !isChecked
				})}
			>
				{isChecked && <Check size={18} color='white' />}
			</span>
			<span>{children}</span>
		</button>
	)
}
