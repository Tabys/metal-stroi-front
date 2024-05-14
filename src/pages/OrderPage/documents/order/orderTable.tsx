import { DocTableDetail, TotalData } from '../../../../models'

type OrderTableProps = {
	detail: DocTableDetail
	index: number
	total: TotalData
}

export function OrderTable({ detail, index, total }: OrderTableProps) {
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{detail.name}</td>
			<td>
				{detail.thickness} {detail.suffixes}
			</td>
			<td>{detail.quantity}</td>
			<td>{detail.time ? detail.time : 0}</td>
			{Number(total.cuting_plasma) > 0 ? (
				<>
					<td>
						{detail.cut_type === 'plasma'
							? Number(detail.length).toFixed(2)
							: 0}
					</td>
					<td>
						{detail.cut_type === 'plasma' ? detail.cut_count : 0}
					</td>
				</>
			) : (
				''
			)}
			{total.chop > 0 ? (
				<td>
					{detail.chop_count
						? detail.chop_count * detail.quantity
						: 0}
				</td>
			) : (
				''
			)}
			{total.bend > 0 ? (
				<td>
					{detail.bend_count
						? detail.bend_count * detail.quantity
						: 0}
				</td>
			) : (
				''
			)}
			{total.rolling > 0 ? <td>{detail.rolling ? '✓' : ' '}</td> : ''}

			<td>{detail.weight}</td>
		</tr>
	)
}
