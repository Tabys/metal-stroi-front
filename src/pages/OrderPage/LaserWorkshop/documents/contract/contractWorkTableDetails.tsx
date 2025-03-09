import { DocTableDetail, TotalData } from '../../../../../models'
import styles from '../style.module.css'

type ContractWorkTableDetailProps = {
	detail: DocTableDetail
	index: number
	total: TotalData
	delivery: number
}

export function ContractWorkTableDetail({ detail, index, total, delivery }: ContractWorkTableDetailProps) {
	const oneKgDrowing = Number(detail.drowing) / (Number(detail.weight) * detail.quantity)

	const total_price =
		Math.ceil(
			Number(detail.bending) +
				Number(detail.choping) +
				Number(detail.cut_cost) +
				Number(detail.metal) +
				Number(detail.painting) +
				Number(detail.rolling) +
				delivery * Number(detail.weight) +
				oneKgDrowing * Number(detail.weight)
		) * detail.quantity

	return (
		<tr>
			<td>{index + 1}</td>
			<td className={styles.left}>{detail.name}</td>
			<td>
				{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td>{Number(detail.cut_cost).toFixed(2)}</td>
			<td>{Number(detail.choping).toFixed(2)}</td>
			<td>0.00</td>
			<td>{Number(detail.bending).toFixed(2)}</td>
			<td>0.00</td>
			<td>0.00</td>
			<td>{total_price / detail.quantity}</td>
			<td>{detail.quantity}</td>
			<td>{total_price}</td>
			<td>{detail.weight}</td>
		</tr>
	)
}
