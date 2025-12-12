'use client'

import cn from 'clsx'
import { m } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import type { FC } from 'react'

import { useSidebarStore } from '@/store/sidebar/sidebarStore'

import styles from './AdminMenu.module.scss'
import { AdminMenuItem } from './AdminMenuItem'
import { SIDEBAR_DATA } from '@/screens/admin/admin-menu/sidebar.data'

const AdminMenu: FC = () => {
	const { isRolledUp, toggleIsRolledUp } = useSidebarStore()

	return (
		<m.aside
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
				{SIDEBAR_DATA.map(s => (
					<AdminMenuItem item={s} key={s.ref} />
				))}
			</nav>
		</m.aside>
	)
}

export default AdminMenu
