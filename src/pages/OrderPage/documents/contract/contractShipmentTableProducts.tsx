import {
	DocTableDetail,
	DocTableProductSpec,
	Product,
} from '../../../../models'

type ContractShipmentTableProductsProps = {
	product: DocTableProductSpec
	index: number
	details: DocTableDetail[] | undefined
}

export function ContractShipmentTableProducts({
	product,
	index,
	details,
}: ContractShipmentTableProductsProps) {
	return (
		<tr key={product.id}>
			<td>{details?.length ? index + 1 + details.length : 0}</td>
			<td>-</td>
			<td>{product.name}</td>
			<td>{(product.totalPrice / product.quantity).toFixed(2)}</td>
			<td>{product.quantity}</td>
			<td>{product.totalPrice.toFixed(2)}</td>
		</tr>
	)
}
