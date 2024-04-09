import { DocTableDetail } from '../../../../models'

type OrderTableProps = {
	detail: DocTableDetail
	index: number
}

export function OrderTable({ detail, index }: OrderTableProps) {
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{detail.name}</td>
			<td>
				{detail.thickness} {detail.suffixes}
			</td>
			<td>{detail.quantity}</td>
			<td>{detail.time ? detail.time : 0}</td>
			<td>
				{detail.cut_type === 'plasma'
					? Number(detail.length).toFixed(2)
					: 0}
			</td>
			<td>{detail.cut_type === 'plasma' ? detail.inset_cost : 0}</td>
			<td>
				{detail.chop_count ? detail.chop_count * detail.quantity : 0}
			</td>
			<td>
				{detail.bend_count ? detail.bend_count * detail.quantity : 0}
			</td>
			<td>{detail.rolling ? '✓' : '𐄂'}</td>
			<td>{detail.weight}</td>
		</tr>
	)
}
