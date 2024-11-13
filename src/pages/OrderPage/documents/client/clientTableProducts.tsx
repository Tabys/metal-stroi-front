import { DocTableProduct } from '../../../../models'
import styles from '../style.module.css'

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
			<td className={styles.center}>{startIndex ? startIndex + index + 1 : 0}</td>
			<td className={styles.left}>{product.name}</td>
			<td className={styles.center}>-</td>
			<td className={styles.center}>{product.quantity}</td>
			<td>{total_price}</td>
		</tr>
	)
}
