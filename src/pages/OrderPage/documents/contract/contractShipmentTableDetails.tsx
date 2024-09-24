import { DocTableDetail } from '../../../../models'

type ContractShipmentTableDetailsProps = {
	detail: DocTableDetail
	index: number
	delivery: number
}

export function ContractShipmentTableDetails({
	detail,
	index,
	delivery,
}: ContractShipmentTableDetailsProps) {
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
		<tr key={detail.id}>
			<td>{index + 1}</td>
			<td>
				{detail.thickness} {detail.suffixes}
			</td>
			<td>{detail.name}</td>
			<td>{(total_price / detail.quantity).toFixed(2)}</td>
			<td>{detail.quantity}</td>
			<td>{total_price.toFixed(2)}</td>
		</tr>
	)
}
