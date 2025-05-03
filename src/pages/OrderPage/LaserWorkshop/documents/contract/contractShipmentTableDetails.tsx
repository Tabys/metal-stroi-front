import { DocTableDetail } from '../../../../../models'
import styles from '../style.module.css'

type ContractShipmentTableDetailsProps = {
	detail: DocTableDetail
	index: number
	delivery: number
}

export function ContractShipmentTableDetails({ detail, index, delivery }: ContractShipmentTableDetailsProps) {
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
		<tr key={detail.id}>
			<td>{index + 1}</td>
			<td>
				{detail.thickness} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td className={styles.left}>{detail.name}</td>
			<td>{total_price / detail.quantity}</td>
			<td>{detail.quantity}</td>
			<td>{total_price}</td>
		</tr>
	)
}
