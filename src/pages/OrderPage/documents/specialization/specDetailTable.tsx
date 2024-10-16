import { DocTableDetail, TotalData } from '../../../../models'

type SpecDetailTableProps = {
	detail: DocTableDetail
	index: number
	total: TotalData
	delivery: number
}

export function SpecDetailTable({ detail, index, total, delivery }: SpecDetailTableProps) {
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
			{Number(total.cuting_plasma) > 0 ? <td>{Number(detail.cut_cost).toFixed(2)}</td> : ''}
			{Number(total.cuting_laser) > 0 ? <td>{Number(detail.cut_cost).toFixed(2)}</td> : ''}
			{total.choping > 0 ? <td>{detail.choping ? Number(detail.choping).toFixed(2) : '0'}</td> : ''}
			{total.bending > 0 ? <td>{Number(detail.bending).toFixed(2)}</td> : ''}
			{Number(total.painting) > 0 ? <td>{Number(detail.painting).toFixed(2)}</td> : ''}
			{total.rolling > 0 ? <td>{Number(detail.rolling).toFixed(2)}</td> : ''}
			{total.drowing > 0 ? <td>{Number(detail.drowing).toFixed(2)}</td> : ''}

			<td>{Number(detail.metal).toFixed(2)}</td>
			<td>{total_price / detail.quantity}</td>
			<td>{detail.quantity}</td>
			<td>{detail.weight}</td>
		</tr>
	)
}
