import { DocTableProductSpec, TotalData } from '../../../../models'
import styles from '../style.module.css'

type SpecProductTableProps = {
	product: DocTableProductSpec
	total: TotalData
	index: number
	delivery: number
}

export function SpecProductTable({ product, total, index, delivery }: SpecProductTableProps) {
	// const total_price =
	// 	Number(detail.bending) +
	// 	Number(detail.choping) +
	// 	Number(detail.cut_cost) +
	// 	Number(detail.metal) +
	// 	Number(detail.painting) +
	// 	Number(detail.rolling) +
	// 	(detail.drowing ? detail.drowing : 0)

	return (
		<tr>
			<td className={styles.center}>{index + 1}</td>
			<td className={styles.left}>{product.name}</td>
			<td className={styles.center}>{product.quantity}</td>
			{total.prod_sm_works > 0 ? <td className={styles.center}>{Number(product.sm_works).toFixed(2)}</td> : ''}
			{total.prod_mk_works > 0 ? <td className={styles.center}>{Number(product.mk_works).toFixed(2)}</td> : ''}
			{total.prod_smithy > 0 ? <td className={styles.center}>{Number(product.smithy).toFixed(2)}</td> : ''}
			{total.prod_tfc_works > 0 ? <td className={styles.center}>{Number(product.tfc_works).toFixed(2)}</td> : ''}
			{total.prod_ac_works > 0 ? <td className={styles.center}>{Number(product.ac_works).toFixed(2)}</td> : ''}
			{total.prod_painting > 0 ? <td className={styles.center}>{Number(product.painting_cost).toFixed(2)}</td> : ''}
			{total.prod_turning_works > 0 ? <td className={styles.center}>{Number(product.turning_works).toFixed(2)}</td> : ''}

			{total.prod_design_department > 0 ? <td className={styles.center}>{Number(product.design_department).toFixed(2)}</td> : ''}
			<td className={styles.center}>{Math.ceil(product.totalPrice + delivery * Number(product.weight)) / Number(product.quantity)}</td>
			<td className={styles.center}>{Number(product.detailsWeight).toFixed(3)}</td>
		</tr>
	)
}
