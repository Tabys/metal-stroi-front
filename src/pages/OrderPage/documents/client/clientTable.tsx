import { DocTableDetail } from '../../../../models'

type ClientTableProps = {
	detail: DocTableDetail
	index: number
	delivery: number
}

export function ClientTable({ detail, index, delivery }: ClientTableProps) {
	console.log(detail)
	const total_price =
		Number(detail.bending) +
		Number(detail.choping) +
		Number(detail.cut_cost) +
		Number(detail.metal) +
		Number(detail.painting) +
		Number(detail.rolling) +
		(detail.drowing ? detail.drowing : 0) +
		delivery * Number(detail.weight) * detail.quantity

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{detail.name}</td>
			<td>
				{detail.thickness} {detail.material} {detail.suffixes}
			</td>
			<td>{detail.quantity}</td>
			<td>{Math.ceil(Number(total_price))}</td>
		</tr>
	)
}
