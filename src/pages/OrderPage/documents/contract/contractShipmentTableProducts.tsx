import {
	DocTableDetail,
	DocTableProductSpec,
	Product,
} from '../../../../models'

type ContractShipmentTableProductsProps = {
	product: DocTableProductSpec
	index: number
	details: DocTableDetail[] | undefined
	delivery: number
}

export function ContractShipmentTableProducts({
	product,
	index,
	details,
	delivery,
}: ContractShipmentTableProductsProps) {
	return (
		<tr key={product.id}>
			<td>{details?.length ? index + 1 + details.length : 0}</td>
			<td>-</td>
			<td>{product.name}</td>
			<td>
				{(
					(product.totalPrice +
						delivery * Number(product.detailsWeight)) /
					product.quantity
				).toFixed(2)}
			</td>
			<td>{product.quantity}</td>
			<td>
				{(
					product.totalPrice +
					delivery * Number(product.detailsWeight)
				).toFixed(2)}
			</td>
		</tr>
	)
}
