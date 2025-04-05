import { TFCData, TFCDetail, TFCTotal } from '../../../../models'
import styles from './style.module.css'
import { TfcSummeryDetail } from './TfcSummeryDetail'
import { tfcSummeryTotalData } from '../tfcTotalData/tfcSummeryTotalData'

type TfcSummaryTableProps = {
	details?: TFCDetail[]
	tfcData?: TFCData
	total: TFCTotal
}

export function TfcSummaryTable({ details, tfcData, total }: TfcSummaryTableProps) {
	const totalData = tfcSummeryTotalData({ details, tfcData, total })

	return (
		<table className={styles.summary_table}>
			<thead>
				<tr>
					<th rowSpan={2}>№</th>
					<th rowSpan={2}>Наименование детали</th>
					<th rowSpan={2}>Стоимость наладки</th>
					<th rowSpan={2}>Стоимость работы станка</th>
					<th colSpan={3}>Расчёт при заказе одного экземпляра</th>
					<th colSpan={4}>Расчёт за указанное количество</th>
				</tr>
				<tr>
					<th>Себестоимость</th>
					<th>Прибыль</th>
					<th>Общая стоимость</th>
					<th>Себестоимость за 1 шт</th>
					<th>Общая себестоимость</th>
					<th>Прибыль</th>
					<th>Общая стоимость</th>
				</tr>
			</thead>

			<tbody>
				{details?.map(detail => (
					<TfcSummeryDetail key={detail.id} detail={detail} tfcData={tfcData} total={total} />
				))}
			</tbody>

			<tfoot>
				<tr>
					<td></td>
					<td></td>
					<td>{totalData.setting_up}</td>
					<td>{totalData.machine_cost}</td>
					<td>{totalData.one_prime_cost}</td>
					<td>{totalData.one_profit}</td>
					<td>{totalData.one_cost}</td>
					<td>-</td>
					<td>{totalData.all_prime_cost}</td>
					<td>{totalData.all_profit}</td>
					<td>{totalData.all_cost}</td>
				</tr>
			</tfoot>
		</table>
	)
}
