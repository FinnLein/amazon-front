import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSidebarStore } from '@/store/sidebar/sidebarStore'

import { IMenuItem } from './sidebar.data'

export function AdminMenuItem({ item }: { item: IMenuItem }) {
	const { isRolledUp } = useSidebarStore()

	const pathname = usePathname()

	return (
		<Link
			href={item.ref}
			className={cn({
				'bg-black-600': pathname === item.ref
			})}
		>
			<item.icon
				className={cn({
					'text-amber-200': pathname === item.ref
				})}
			/>
			{!isRolledUp && <span>{item.name}</span>}
		</Link>
	)
}
