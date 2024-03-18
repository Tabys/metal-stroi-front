import { DocTableProduct, Product } from '../../../../models'

type PaintingTableProductsProps = {
	product: DocTableProduct
	index: number
	startIndex: number | undefined
}

export function PaintingTableProducts({
	product,
	index,
	startIndex,
}: PaintingTableProductsProps) {
	return (
		<tr>
			<td>{startIndex ? startIndex + index + 1 : 0}</td>
			<td>{product.name}</td>
			<td>{product.quantity}</td>
			<td>{product.painting_color}</td>
			<td>{Number(product.value).toFixed(3)}</td>
			<td>{Number(product.painting_cost).toFixed(3)}</td>
		</tr>
	)
}
