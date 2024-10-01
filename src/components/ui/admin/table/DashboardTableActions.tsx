import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import styles from './DashboardTable.module.scss'
import { IDashbordTableBaseData } from './dashbord-table.type'
export function DashboardTableActions<TData extends IDashbordTableBaseData>({
	baseRecord
}: {
	baseRecord: TData
}) {
	const { editUrl, deleteHandler } = baseRecord

	return (
		<>
			{editUrl && (
				<td className={styles.minWidth}>
					<Link href={editUrl}>
						<Edit />
					</Link>
				</td>
			)}

			{deleteHandler && (
				<td className={styles.minWidth}>
					<button onClick={deleteHandler} aria-label='delete'>
						<Trash2 />
					</button>
				</td>
			)}
		</>
	)
}
