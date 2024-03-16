import { DocTableDetail } from '../../../../models'

type ClientTableProps = {
	detail: DocTableDetail
	index: number
}

export function ClientTable({ detail, index }: ClientTableProps) {
	const total_price = (
		Number(detail.bending) +
		Number(detail.choping) +
		Number(detail.cut_cost) +
		Number(detail.metal) +
		Number(detail.painting) +
		(detail.drowing ? detail.drowing : 0)
	).toFixed(1)
	// console.log(detail.drowing)
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{detail.name}</td>
			<td>{detail.thickness}</td>
			<td>{detail.quantity}</td>
			<td>{total_price}</td>
		</tr>
	)
}
