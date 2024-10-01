'use client'

import { useProfile } from '@/hooks/useProfile'
import styles from './DashboardTable.module.scss'
import { DashboardTableActions } from './DashboardTableActions'
import { IDashbordTable, IDashbordTableBaseData } from './dashbord-table.type'

function DashboardTable<TData extends IDashbordTableBaseData>({
	columns,
	data,
	headerActions
}: IDashbordTable<TData>) {

	return (
		<div className={styles.body_table_admin}>
			<table className={styles.table_admin}>
				<thead>
					<tr>
						{columns.map(column => (
							<th key={column.title}>{column.title}</th>
						))}
						{headerActions.map(column => (
							<th key={column} className={styles.minWidth}>
								{column}
							</th>
						))}
					</tr>
				</thead>

				<tbody>
					{data.length ? (
						data.map((record, rowIndex) => (
							<tr key={rowIndex}>
								{columns.map(column => {
									return (
										<td key={column.dataIndex.toString() + rowIndex}>
											{column.render(record, rowIndex)}
										</td>
									)
								})}
								<DashboardTableActions<TData> baseRecord={record} />
							</tr>
						))
					) : (
						<tr className='hover:!bg-transparent'>
							<td className='!border-r-0'>Not found</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default DashboardTable
