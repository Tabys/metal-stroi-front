import { DocTableDetail } from '../../../../models'

type ContractShipmentTableDetailsProps = {
	detail: DocTableDetail
	index: number
	delivery: number
}

export function ContractShipmentTableDetails({ detail, index, delivery }: ContractShipmentTableDetailsProps) {
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
		<tr key={detail.id}>
			<td>{index + 1}</td>
			<td>
				{detail.thickness} {detail.suffixes} {detail.customers_metal ? 'зак' : ''}
			</td>
			<td>{detail.name}</td>
			<td>{total_price / detail.quantity}</td>
			<td>{detail.quantity}</td>
			<td>{total_price}</td>
		</tr>
	)
}
