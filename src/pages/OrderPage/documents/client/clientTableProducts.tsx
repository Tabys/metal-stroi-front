import { DocTableProduct, Product } from '../../../../models'

type ClientTableProductsProps = {
	product: DocTableProduct
	index: number
	startIndex: number | undefined
	delivery: number
}

export function ClientTableProducts({
	product,
	index,
	startIndex,
	delivery,
}: ClientTableProductsProps) {
	// const total_price = (
	// 	Number(product.bending) +
	// 	Number(product.choping) +
	// 	Number(product.cut_cost) +
	// 	Number(product.metal)
	// ).toFixed(1)
	return (
		<tr>
			<td>{startIndex ? startIndex + index + 1 : 0}</td>
			<td>{product.name}</td>
			<td>-</td>
			<td>{product.quantity}</td>
			<td>
				{Math.ceil(
					product.totalPrice +
						delivery * Number(product.weight) * product.quantity
				)}
			</td>
		</tr>
	)
}
