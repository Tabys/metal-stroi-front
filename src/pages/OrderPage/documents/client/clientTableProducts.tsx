import { DocTableProduct } from '../../../../models'

type ClientTableProductsProps = {
	product: DocTableProduct
	index: number
	startIndex: number | undefined
	delivery: number
}

export function ClientTableProducts({ product, index, startIndex, delivery }: ClientTableProductsProps) {
	const total_price = Math.ceil(product.totalPrice + delivery * Number(product.weight))

	return (
		<tr className={index === 0 ? 'borderBold' : ''}>
			<td>{startIndex ? startIndex + index + 1 : 0}</td>
			<td>{product.name}</td>
			<td>-</td>
			<td>{product.quantity}</td>
			<td>{total_price}</td>
		</tr>
	)
}
