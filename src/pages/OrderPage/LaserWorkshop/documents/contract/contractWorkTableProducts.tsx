import { DocTableProductSpec, TotalData } from '../../../../../models'
import styles from '../style.module.css'

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
			<td className={styles.left}>{product.name}</td>
			<td>-</td>

			<td>{(Number(product.detailsCutCost) / product.quantity).toFixed(2)}</td>
			<td>{(Number(product.detailsChoping) / product.quantity).toFixed(2)}</td>
			<td>{(Number(total.prod_turning_works) / product.quantity).toFixed(2)}</td>
			<td>{(Number(product.detailsBanding) / product.quantity).toFixed(2)}</td>
			<td>{(Number(total.prod_painting) / product.quantity).toFixed(2)}</td>
			{/* <td>{(Number(total.prod_welding) / product.quantity).toFixed(2)}</td> */}
			<td>{Number((Number((product.totalPrice + delivery * Number(product.weight)).toFixed(2)) / Number(product.quantity)).toFixed(2))}</td>
			<td>{product.quantity}</td>
			<td>{(product.totalPrice + delivery * Number(product.weight)).toFixed(2)}</td>
			<td>{(Number(product.weight) / product.quantity).toFixed(2)}</td>
		</tr>
	)
}
