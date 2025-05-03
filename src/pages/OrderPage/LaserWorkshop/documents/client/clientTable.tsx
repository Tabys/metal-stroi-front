import { DocTableDetail } from '../../../../../models'
import styles from '../style.module.css'

type ClientTableProps = {
	detail: DocTableDetail
	editedDetailsFull?: DocTableDetail[]
	index: number
	delivery: number
}

export function ClientTable({ detail, editedDetailsFull, index, delivery }: ClientTableProps) {
	const full_detail_quantity = editedDetailsFull?.find(full_detail => full_detail.id === detail.id)?.quantity
	const oneKgDrowing = Number(detail.drowing) / (Number(detail.weight) * Number(full_detail_quantity))

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
			) * Number(detail.quantity)
		).toFixed(2)
	)

	return (
		<tr>
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.left}>{detail.name}</td>
			<td className={styles.center}>
				{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td className={styles.center}>{detail.quantity}</td>
			<td>{total_price}</td>
		</tr>
	)
}
