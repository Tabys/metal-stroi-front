import { Rates, TFCData, TFCDetail, TFCTotal } from '../../../../models'
import styles from './style.module.css'
import { TfcSummeryDetail } from './TfcSummeryDetail'
import { tfcSummeryTotalData } from '../tfcTotalData/tfcSummeryTotalData'

type TfcSummaryTableProps = {
	details?: TFCDetail[]
	tfcData?: TFCData
	total: TFCTotal
	rates: Rates[]
}

export function TfcSummaryTable({ details, tfcData, total, rates }: TfcSummaryTableProps) {
	const totalData = tfcSummeryTotalData({ details, tfcData, total })
	const rate = rates.find(rate => rate.bx_id === tfcData?.payment_form)
	console.log(rate)

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
					<th>Общая стоимость {rate ? `(${rate.abbreviations})` : '(АГ)'}</th>
					<th>Себестоимость за 1 шт</th>
					<th>Общая себестоимость </th>
					<th>Прибыль</th>
					<th>Общая стоимость {rate ? `(${rate.abbreviations})` : '(АГ)'}</th>
				</tr>
			</thead>

			<tbody>
				{details?.map((detail, index) => (
					<TfcSummeryDetail key={detail.id} detail={detail} tfcData={tfcData} total={total} index={index} />
				))}
			</tbody>

			<tfoot>
				<tr>
					<td></td>
					<td></td>
					<td>{Number(totalData.setup_cost).toFixed(3)}</td>
					<td>{Number(totalData.machine_time_cost).toFixed(3)}</td>
					<td>{totalData.one_prime_cost}</td>
					<td>{totalData.one_profit}</td>
					<td>{totalData.one_cost}</td>
					<td>-</td>
					<td>{totalData.all_prime_cost}</td>
					<td>{totalData.all_profit}</td>
					<td>{Math.ceil(totalData.all_cost)}</td>
				</tr>
			</tfoot>
		</table>
	)
}
