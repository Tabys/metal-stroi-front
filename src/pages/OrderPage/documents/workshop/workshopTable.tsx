import { DocTableDetail } from '../../../../models'

type WHTableProps = {
	details: DocTableDetail
	index: number
}

export function WorkshopTable({ details, index }: WHTableProps) {
	// const total_price = ((Number(details.bending) + Number(details.choping) + Number(details.cut_cost) + Number(details.metal)) * details.quantity).toFixed(1)

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{details.name}</td>
			<td>
				{details.thickness} {details.material} {details.suffixes}
			</td>
			<td>{details.quantity}</td>
			<td>{details.cut_type === 'laser' ? 'Лазер' : 'Плазма'}</td>
			<td>{details.chop_count ? details.chop_count : 0}</td>
			<td>{details.bend_count ? details.bend_count : 0}</td>
			<td>{details.rolling ? '✓' : ' '}</td>
		</tr>
	)
}
