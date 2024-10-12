import { DocTableProductSpec, TotalData } from '../../../../models'

type SpecProductTableProps = {
	product: DocTableProductSpec
	total: TotalData
	index: number
	delivery: number
}

export function SpecProductTable({ product, total, index, delivery }: SpecProductTableProps) {
	// const total_price =
	// 	Number(detail.bending) +
	// 	Number(detail.choping) +
	// 	Number(detail.cut_cost) +
	// 	Number(detail.metal) +
	// 	Number(detail.painting) +
	// 	Number(detail.rolling) +
	// 	(detail.drowing ? detail.drowing : 0)

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{product.name}</td>
			<td>{product.quantity}</td>
			{total.prod_welding > 0 ? <td>{Number(product.welding).toFixed(2)}</td> : ''}
			{total.prod_painting > 0 ? <td>{Number(product.painting_cost).toFixed(2)}</td> : ''}
			{total.prod_turning_works > 0 ? <td>{Number(product.turning_works).toFixed(2)}</td> : ''}

			{total.prod_smithy > 0 ? <td>{Number(product.smithy).toFixed(2)}</td> : ''}
			{total.prod_design_department > 0 ? <td>{Number(product.design_department).toFixed(2)}</td> : ''}
			<td>{Math.ceil(product.totalPrice + delivery * Number(product.weight)) / Number(product.quantity)}</td>
			<td>{Number(product.detailsWeight).toFixed(3)}</td>
		</tr>
	)
}
