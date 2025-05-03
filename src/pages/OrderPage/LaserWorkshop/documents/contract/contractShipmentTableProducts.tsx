import { DocTableDetail, DocTableProductSpec } from '../../../../../models'
import styles from '../style.module.css'

type ContractShipmentTableProductsProps = {
	product: DocTableProductSpec
	index: number
	details: DocTableDetail[] | undefined
	delivery: number
}

export function ContractShipmentTableProducts({ product, index, details, delivery }: ContractShipmentTableProductsProps) {
	return (
		<tr key={product.id}>
			<td>{details?.length ? index + 1 + details.length : 0}</td>
			<td>-</td>
			<td className={styles.left}>{product.name}</td>
			<td>{Number((Number((product.totalPrice + delivery * Number(product.weight)).toFixed(2)) / Number(product.quantity)).toFixed(2))}</td>
			<td>{product.quantity}</td>
			<td>{(product.totalPrice + delivery * Number(product.weight)).toFixed(2)}</td>
		</tr>
	)
}
