import { DocTableDetail } from '../../../../models'

type PaintingTableProps = {
	detail: DocTableDetail
	index: number
}

export function PaintingTable({ detail, index }: PaintingTableProps) {
	const volume = (Number(detail.surface) / 1000000) * 2
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{detail.name}</td>
			<td>{detail.quantity}</td>
			<td>{detail.polymer}</td>
			<td>{volume.toFixed(3)}</td>
			<td>{Number(detail.painting).toFixed(3)}</td>
		</tr>
	)
}
