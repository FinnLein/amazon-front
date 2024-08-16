import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'orange' | 'white'
	size?: 'sm' | 'md' | 'lg'
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variant,
	size = 'md',
	...rest
}) => {
	return (
		<button
			{...rest}
			className={cn(
				'rounded-xl font-medium shadow px-10 py-2 hover:shadow-lg transition duration-300 ease-in-out',
				{
					'text-white bg-primary': variant === 'orange',
					'text-primary bg-white': variant === 'white',
					'text-sm px-4 py-2': size === 'sm',
					'text-base px-5 py-3': size === 'md',
					'text-xl px-7 py-3': size === 'lg'
				},
				className
			)}
		>
			{children}
		</button>
	)
}

export default Button
