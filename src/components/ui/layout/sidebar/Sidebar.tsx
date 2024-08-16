import cn from 'clsx'
import { FC } from 'react'

interface ISidebar {
	classname?: string
}

const Sidebar: FC<ISidebar> = ({ classname }) => {
	return (
		<aside className={cn(classname, 'h-screen bg-secondary')}>Sidebar</aside>
	)
}

export default Sidebar
