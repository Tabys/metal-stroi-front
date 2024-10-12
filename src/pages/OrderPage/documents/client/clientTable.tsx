import { DocTableDetail } from '../../../../models'

type ClientTableProps = {
	detail: DocTableDetail
	index: number
	delivery: number
}

export function ClientTable({ detail, index, delivery }: ClientTableProps) {
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
			<td>{detail.name}</td>
			<td>
				{detail.thickness} {detail.material} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td>{detail.quantity}</td>
			<td>{total_price}</td>
		</tr>
	)
}
