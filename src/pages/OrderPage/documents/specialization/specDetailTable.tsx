import { DocTableDetail, TotalData } from '../../../../models'

type SpecDetailTableProps = {
	detail: DocTableDetail
	index: number
	total: TotalData
}

export function SpecDetailTable({
	detail,
	index,
	total,
}: SpecDetailTableProps) {
	const total_price =
		Number(detail.bending) +
		Number(detail.choping) +
		Number(detail.cut_cost) +
		Number(detail.metal) +
		Number(detail.painting) +
		Number(detail.rolling) +
		(detail.drowing ? detail.drowing : 0)

	return (
		<tr>
			<td>{index + 1}</td>
			<td>
				{detail.thickness} {detail.material} {detail.suffixes}
			</td>
			<td>{detail.name}</td>
			{Number(total.cuting_plasma) > 0 ? (
				<td>
					{(Number(detail.cut_cost) / detail.quantity).toFixed(1)}
				</td>
			) : (
				''
			)}
			{Number(total.cuting_laser) > 0 ? (
				<td>
					{(Number(detail.cut_cost) / detail.quantity).toFixed(1)}
				</td>
			) : (
				''
			)}
			{total.choping > 0 ? (
				<td>
					{detail.choping
						? (Number(detail.choping) / detail.quantity).toFixed(1)
						: '0'}
				</td>
			) : (
				''
			)}
			{total.bending > 0 ? (
				<td>{(Number(detail.bending) / detail.quantity).toFixed(1)}</td>
			) : (
				''
			)}
			{Number(total.painting) > 0 ? (
				<td>
					{(Number(detail.painting) / detail.quantity).toFixed(1)}
				</td>
			) : (
				''
			)}
			{total.rolling > 0 ? (
				<td>{(Number(detail.rolling) / detail.quantity).toFixed(1)}</td>
			) : (
				''
			)}
			{total.drowing > 0 ? (
				<td>{(Number(detail.drowing) / detail.quantity).toFixed(1)}</td>
			) : (
				''
			)}

			<td>{(Number(detail.metal) / detail.quantity).toFixed(1)}</td>
			<td>{(total_price / detail.quantity).toFixed(1)}</td>
			<td>{detail.quantity}</td>
			<td>{detail.weight}</td>
		</tr>
	)
}
