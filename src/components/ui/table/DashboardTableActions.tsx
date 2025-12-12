import { Edit, Trash2, View } from 'lucide-react'
import Link from 'next/link'

import styles from './DashboardTable.module.scss'
import { IDashboardTableBaseData } from './dashbord-table.type'

export function DashboardTableActions<TData extends IDashboardTableBaseData>({
	baseRecord
}: {
	baseRecord: TData
}) {
	const { editUrl, deleteHandler, viewUrl } = baseRecord

	return (
		<>
			{editUrl && (
				<td className={styles.minWidth}>
					<Link
						className='hover:text-orange-300 transition-colors duration-300 ease-in-out'
						href={editUrl}
					>
						<Edit />
					</Link>
				</td>
			)}
			{viewUrl && (
				<td className={styles.minWidth}>
					<Link
						className='hover:text-orange-300 transition-colors duration-300 ease-in-out'
						href={viewUrl}
					>
						<View />
					</Link>
				</td>
			)}

			{deleteHandler && (
				<td className={styles.minWidth}>
					<button onClick={deleteHandler} aria-label='delete'>
						<Trash2 className='hover:text-rose-500 transition-colors duration-300 ease-in-out' />
					</button>
				</td>
			)}
		</>
	)
}
