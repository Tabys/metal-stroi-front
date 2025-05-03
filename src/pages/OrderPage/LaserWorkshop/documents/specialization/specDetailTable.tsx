import { DocTableDetail, TotalData } from '../../../../../models'
import styles from '../style.module.css'

type SpecDetailTableProps = {
	detail: DocTableDetail
	index: number
	total: TotalData
	delivery: number
	showTable: boolean
}

export function SpecDetailTable({ detail, index, total, delivery, showTable }: SpecDetailTableProps) {
	const oneKgDrowing = Number(detail.drowing) / (Number(detail.weight) * detail.quantity)

	const total_price = Number(
		(
			Number(
				(
					Number(detail.bending) +
					Number(detail.choping) +
					Number(detail.cut_cost) +
					Number(detail.metal) +
					Number(detail.painting) +
					Number(detail.rolling) +
					delivery * Number(detail.weight) +
					oneKgDrowing * Number(detail.weight)
				).toFixed(2)
			) * detail.quantity
		).toFixed(2)
	)

	return (
		<tr>
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.center}>
				{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td className={styles.left}>{detail.name}</td>
			{Number(total.cuting_plasma) > 0 ? (
				<td className={showTable === true ? styles.center : styles.hideTable}>{Number(detail.cut_cost).toFixed(2)}</td>
			) : (
				''
			)}
			{Number(total.cuting_laser) > 0 ? (
				<td className={showTable === true ? styles.center : styles.hideTable}>{Number(detail.cut_cost).toFixed(2)}</td>
			) : (
				''
			)}
			{total.choping > 0 ? (
				<td className={showTable === true ? styles.center : styles.hideTable}>{detail.choping ? Number(detail.choping).toFixed(2) : '0'}</td>
			) : (
				''
			)}
			{total.bending > 0 ? <td className={showTable === true ? styles.center : styles.hideTable}>{Number(detail.bending).toFixed(2)}</td> : ''}
			{Number(total.painting) > 0 ? <td className={showTable === true ? styles.center : styles.hideTable}>{Number(detail.painting).toFixed(2)}</td> : ''}
			{total.rolling > 0 ? <td className={showTable === true ? styles.center : styles.hideTable}>{Number(detail.rolling).toFixed(2)}</td> : ''}
			{total.drowing > 0 ? <td className={showTable === true ? styles.center : styles.hideTable}>{Number(detail.drowing).toFixed(2)}</td> : ''}

			<td className={showTable === true ? styles.center : styles.hideTable}>{Number(detail.metal).toFixed(2)}</td>
			<td className={styles.center}>{total_price / detail.quantity}</td>
			<td className={styles.center}>{detail.quantity}</td>
			<td className={styles.center}>{detail.weight}</td>
		</tr>
	)
}
