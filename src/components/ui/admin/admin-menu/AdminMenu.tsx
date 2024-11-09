'use client'

import cn from 'clsx'
import { m } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { FC } from 'react'

import { sidebarData } from '@/ui/admin/admin-menu/sidebar.data'

import { useSidebarStore } from '@/store/sidebar/sidebarStore'

import styles from './AdminMenu.module.scss'
import { AdminMenuItem } from './AdminMenuItem'

const AdminMenu: FC = () => {
	const { isRolledUp, toggleIsRolledUp } = useSidebarStore()

	return (
		<m.aside
			initial={{ translateY: -1000 }}
			animate={{ translateY: 0 }}
			transition={{ type: 'tween', ease: 'easeInOut', duration: 0.7 }}
		>
			<m.div
				animate={{ width: isRolledUp ? 60 : 240 }}
				transition={{ type: 'spring', stiffness: 300, damping: 20 }}
				className={cn(styles.sidebar, {
					[styles.rolledUp]: isRolledUp
				})}
			>
				<button className={styles.toggle} onClick={() => toggleIsRolledUp()}>
					{isRolledUp ? <PanelLeftOpen /> : <PanelLeftClose />}
				</button>

				<nav className={styles.menu}>
					{sidebarData.map(s => (
						<AdminMenuItem item={s} key={s.ref} />
					))}
				</nav>
			</m.div>
		</m.aside>
	)
}

export default AdminMenu
