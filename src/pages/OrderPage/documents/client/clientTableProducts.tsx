import { DocTableProduct, Product } from '../../../../models'

type ClientTableProductsProps = {
	product: DocTableProduct
	index: number
	startIndex: number | undefined
}

export function ClientTableProducts({
	product,
	index,
	startIndex,
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
			<td>{product.totalPrice.toFixed(1)}</td>
		</tr>
	)
}
