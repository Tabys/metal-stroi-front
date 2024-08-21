import { DocTableProductSpec, Product, TotalData } from '../../../../models'

type ContractWorkTableProductProps = {
	product: DocTableProductSpec
	total: TotalData
	index: number
	delivery: number
	startIndex: number | undefined
}

export function ContractWorkTableProduct({
	product,
	total,
	index,
	delivery,
	startIndex,
}: ContractWorkTableProductProps) {
	return (
		<tr>
			<td>{Number(startIndex) + index + 1}</td>
			<td>{product.name}</td>
			<td>-</td>
			{Number(total.cuting_laser) > 0 ||
			Number(total.cuting_plasma) > 0 ? (
				<td>
					{(
						Number(product.detailsCutCost) / product.quantity
					).toFixed(2)}
				</td>
			) : (
				''
			)}
			{total.choping > 0 ? (
				<td>
					{(
						Number(product.detailsChoping) / product.quantity
					).toFixed(2)}
				</td>
			) : (
				''
			)}
			{total.prod_turning_works > 0 ? (
				<td>{Number(total.prod_turning_works) / product.quantity}</td>
			) : (
				''
			)}
			{total.bending > 0 ? (
				<td>
					{(
						Number(product.detailsBanding) / product.quantity
					).toFixed(2)}
				</td>
			) : (
				''
			)}
			{total.prod_painting > 0 ? (
				<td>
					{(Number(total.prod_painting) / product.quantity).toFixed(
						2
					)}
				</td>
			) : (
				''
			)}
			{total.prod_welding > 0 ? (
				<td>
					{(Number(total.prod_welding) / product.quantity).toFixed(2)}
				</td>
			) : (
				''
			)}
			<td>
				{(
					product.totalPrice / product.quantity +
					delivery * Number(product.detailsWeight)
				).toFixed(2)}
			</td>
			<td>{product.quantity}</td>
			<td>
				{(
					product.totalPrice +
					delivery * Number(product.detailsWeight)
				).toFixed(2)}
			</td>
			<td>{(Number(product.weight) / product.quantity).toFixed(2)}</td>
		</tr>
	)
}
