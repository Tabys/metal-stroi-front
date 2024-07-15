import { DocTableProductSpec, Product, TotalData } from '../../../../models'

type SpecProductTableProps = {
	product: DocTableProductSpec
	total: TotalData
	index: number
}

export function SpecProductTable({
	product,
	total,
	index,
}: SpecProductTableProps) {
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
			{total.prod_welding > 0 ? <td>{product.welding}</td> : ''}
			{total.prod_painting > 0 ? <td>{product.painting_cost}</td> : ''}
			{total.prod_turning_works > 0 ? (
				<td>{product.turning_works}</td>
			) : (
				''
			)}

			{total.prod_smithy > 0 ? <td>{product.smithy}</td> : ''}
			{total.prod_design_department > 0 ? (
				<td>{product.design_department}</td>
			) : (
				''
			)}
			<td>{(product.totalPrice / product.quantity).toFixed(1)}</td>
			<td>{Number(product.detailsWeight).toFixed(3)}</td>
		</tr>
	)
}
