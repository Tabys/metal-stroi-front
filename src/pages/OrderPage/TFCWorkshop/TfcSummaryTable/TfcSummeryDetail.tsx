import { TFCDetail, TFCData, TFCTotal } from '../../../../models'
import { tfcSummeryDataDetail } from '../tfcTotalData/tfcSummeryDataDetail'
import styles from './style.module.css'

type TfcSummeryDetailProps = {
	detail: TFCDetail
	tfcData?: TFCData
	total: TFCTotal
}

export function TfcSummeryDetail({ detail, tfcData, total }: TfcSummeryDetailProps) {
	const detailData = tfcSummeryDataDetail({ detail, tfcData, total })

	return (
		<tr>
			<td>{detail.id}</td>
			<td>{detail.name}</td>
			<td className={styles.blue}>{detailData.setting_up}</td>
			<td className={styles.blue}>{detailData.machine_cost}</td>
			<td className={styles.blue}>{detailData.one_prime_cost}</td>
			<td className={styles.blue}>{detailData.one_profit}</td>
			<td className={styles.blue}>{detailData.one_cost}</td>
			<td className={styles.blue}>{detailData.all_prime_cost_one}</td>
			<td className={styles.blue}>{detailData.all_prime_cost}</td>
			<td className={styles.blue}>{detailData.all_profit}</td>
			<td className={styles.blue}>{detailData.all_cost}</td>
		</tr>
	)
}
