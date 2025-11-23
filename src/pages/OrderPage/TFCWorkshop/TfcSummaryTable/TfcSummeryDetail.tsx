import { TFCDetail, TFCData, TFCTotal } from '../../../../models'
import { tfcSummeryDataDetail } from '../tfcTotalData/tfcSummeryDataDetail'
import styles from './style.module.css'

type TfcSummeryDetailProps = {
	detail: TFCDetail
	tfcData?: TFCData
	total: TFCTotal
	index: number
}

export function TfcSummeryDetail({ detail, tfcData, total, index }: TfcSummeryDetailProps) {
	const detailData = tfcSummeryDataDetail({ detail, tfcData, total })

	return (
		<tr>
			<td>{index + 1}</td>
			<td>{detail.name}</td>
			<td className={styles.blue}>{Number(detailData.setup_cost).toFixed(3)}</td>
			<td className={styles.blue}>{Number(detailData.machine_time_cost).toFixed(3)}</td>
			<td className={styles.blue}>{detailData.one_prime_cost}</td>
			<td className={styles.blue}>{Number(detailData.one_profit).toFixed(3)}</td>
			<td className={styles.blue}>{Number(detailData.one_cost).toFixed(3)}</td>
			<td className={styles.blue}>{Number(detailData.all_prime_cost_one).toFixed(3)}</td>
			<td className={styles.blue}>{detailData.all_prime_cost}</td>
			<td className={styles.blue}>{detailData.all_profit}</td>
			<td className={styles.blue}>{detailData.all_cost}</td>
		</tr>
	)
}
