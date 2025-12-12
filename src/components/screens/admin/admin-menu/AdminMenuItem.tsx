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
			className={cn(
				'relative rounded-lg hover:scale-105 transition-all ease-in-out duration-300',
				{
					'bg-black-700': pathname === item.ref
				}
			)}
		>
			<item.icon
				className={cn('z-20', {
					'text-amber-200': pathname === item.ref
				})}
			/>
			{!isRolledUp && <span className='z-20'>{item.name}</span>}
		</Link>
	)
}
