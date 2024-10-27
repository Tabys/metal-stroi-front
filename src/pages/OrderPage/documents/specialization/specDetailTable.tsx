import { DocTableDetail, TotalData } from '../../../../models'
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
			<td>
				{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td>{detail.name}</td>
			{Number(total.cuting_plasma) > 0 ? <td className={showTable === true ? '' : styles.hideTable}>{Number(detail.cut_cost).toFixed(2)}</td> : ''}
			{Number(total.cuting_laser) > 0 ? <td className={showTable === true ? '' : styles.hideTable}>{Number(detail.cut_cost).toFixed(2)}</td> : ''}
			{total.choping > 0 ? (
				<td className={showTable === true ? '' : styles.hideTable}>{detail.choping ? Number(detail.choping).toFixed(2) : '0'}</td>
			) : (
				''
			)}
			{total.bending > 0 ? <td className={showTable === true ? '' : styles.hideTable}>{Number(detail.bending).toFixed(2)}</td> : ''}
			{Number(total.painting) > 0 ? <td className={showTable === true ? '' : styles.hideTable}>{Number(detail.painting).toFixed(2)}</td> : ''}
			{total.rolling > 0 ? <td className={showTable === true ? '' : styles.hideTable}>{Number(detail.rolling).toFixed(2)}</td> : ''}
			{total.drowing > 0 ? <td className={showTable === true ? '' : styles.hideTable}>{Number(detail.drowing).toFixed(2)}</td> : ''}

			<td className={showTable === true ? '' : styles.hideTable}>{Number(detail.metal).toFixed(2)}</td>
			<td>{total_price / detail.quantity}</td>
			<td>{detail.quantity}</td>
			<td>{detail.weight}</td>
		</tr>
	)
}
