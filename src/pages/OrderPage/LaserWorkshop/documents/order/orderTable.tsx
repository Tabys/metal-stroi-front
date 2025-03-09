import { DocTableDetail, TotalData } from '../../../../../models'
import styles from '../style.module.css'

type OrderTableProps = {
	detail: DocTableDetail
	index: number
	total: TotalData
}

export function OrderTable({ detail, index, total }: OrderTableProps) {
	return (
		<tr>
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.left}>{detail.name}</td>
			<td className={styles.center}>
				{detail.thickness} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td className={styles.center}>{detail.quantity}</td>
			<td className={styles.center}>{detail.time ? detail.time : 0}</td>
			{Number(total.cuting_plasma) > 0 ? (
				<>
					<td className={styles.center}>{detail.cut_type === 'plasma' ? Number(detail.length).toFixed(2) : 0}</td>
					<td className={styles.center}>{detail.cut_type === 'plasma' ? detail.cut_count : 0}</td>
				</>
			) : (
				''
			)}
			{total.chop > 0 ? <td className={styles.center}>{detail.chop_count ? detail.chop_count * detail.quantity : 0}</td> : ''}
			{total.bend > 0 ? <td className={styles.center}>{detail.bend_count ? detail.bend_count * detail.quantity : 0}</td> : ''}
			{total.rolling > 0 ? <td className={styles.center}>{detail.rolling ? '✓' : ' '}</td> : ''}

			<td className={styles.center}>{detail.weight}</td>
		</tr>
	)
}
