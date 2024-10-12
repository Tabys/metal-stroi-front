import { DocTableProductSpec, TotalData } from '../../../../models'

type ContractWorkTableProductProps = {
	product: DocTableProductSpec
	total: TotalData
	index: number
	delivery: number
	startIndex: number | undefined
}

export function ContractWorkTableProduct({ product, total, index, delivery, startIndex }: ContractWorkTableProductProps) {
	return (
		<tr>
			<td>{Number(startIndex) + index + 1}</td>
			<td>{product.name}</td>
			<td>-</td>

			<td>{(Number(product.detailsCutCost) / product.quantity).toFixed(2)}</td>
			<td>{(Number(product.detailsChoping) / product.quantity).toFixed(2)}</td>
			<td>{(Number(total.prod_turning_works) / product.quantity).toFixed(2)}</td>
			<td>{(Number(product.detailsBanding) / product.quantity).toFixed(2)}</td>
			<td>{(Number(total.prod_painting) / product.quantity).toFixed(2)}</td>
			<td>{(Number(total.prod_welding) / product.quantity).toFixed(2)}</td>
			<td>{Math.ceil(product.totalPrice + delivery * Number(product.weight)) / Number(product.quantity)}</td>
			<td>{product.quantity}</td>
			<td>{Math.ceil(product.totalPrice + delivery * Number(product.weight))}</td>
			<td>{(Number(product.weight) / product.quantity).toFixed(2)}</td>
		</tr>
	)
}
