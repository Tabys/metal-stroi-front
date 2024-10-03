import { DocTableDetail, TotalData } from '../../../../models'

type ContractWorkTableDetailProps = {
	detail: DocTableDetail
	index: number
	total: TotalData
	delivery: number
}

export function ContractWorkTableDetail({
	detail,
	index,
	total,
	delivery,
}: ContractWorkTableDetailProps) {
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
			<td>{(Number(detail.cut_cost) / detail.quantity).toFixed(2)}</td>
			<td>{(Number(detail.choping) / detail.quantity).toFixed(2)}</td>
			<td>0.00</td>
			<td>{(Number(detail.bending) / detail.quantity).toFixed(2)}</td>
			<td>0.00</td>
			<td>0.00</td>
			<td>{(total_price / detail.quantity).toFixed(2)}</td>
			<td>{detail.quantity}</td>
			<td>{total_price.toFixed(2)}</td>
			<td>{detail.weight}</td>
		</tr>
	)
}
