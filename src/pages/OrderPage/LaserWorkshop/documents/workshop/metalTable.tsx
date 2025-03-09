import { WorkshopMetal } from '../../../../../models'
import { getMetalNameSuffix } from '../../metalList/getMetalNameSuffix'
import styles from '../style.module.css'

type NeededMetalProps = {
	metals: WorkshopMetal
}
export function MetalTable({ metals }: NeededMetalProps) {
	const material = getMetalNameSuffix(metals.material ? metals.material : '')
	return (
		<tr>
			<td className={styles.center}>{metals.customers_metal ? 'зак' : 'наш'}</td>
			<td className={styles.center}>{material === 'Ст3' ? (metals.suffixes ? metals.suffixes : material) : material + ' ' + metals.suffixes}</td>
			<td className={styles.center}>{metals.thickness_title}</td>
			<td className={styles.center}>{metals.width}</td>
			<td className={styles.center}>{metals.length}</td>
			<td className={styles.center}>{Number(metals.metal_sheets).toFixed(3)}</td>
			<td className={styles.metal_comment_wrapper}>
				<textarea className={'form-control ' + styles.metal_comment}></textarea>
			</td>
		</tr>
	)
}
