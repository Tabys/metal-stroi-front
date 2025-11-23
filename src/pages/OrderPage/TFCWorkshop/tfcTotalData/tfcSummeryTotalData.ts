import Decimal from 'decimal.js'
import { TFCDetail, TFCData, TFCTotal } from '../../../../models'
import { tfcSummeryDataDetail } from './tfcSummeryDataDetail'

type tfcSummeryTotalDataProps = {
	details?: TFCDetail[]
	tfcData?: TFCData
	total?: TFCTotal
}

export function tfcSummeryTotalData({ details, tfcData, total }: tfcSummeryTotalDataProps) {
	let total_setup_cost = 0
	let total_machine_time_cost = 0
	let total_one_prime_cost = 0
	let total_one_profit = 0
	let total_one_cost = 0
	let total_all_prime_cost_one = 0
	let total_all_prime_cost = 0
	let total_all_profit = 0
	const total_all_cost = new Decimal(total?.cost || 0).sub(total?.other_workshops_works || 0).toNumber()

	details?.forEach(detail => {
		const detailData = tfcSummeryDataDetail({ detail, tfcData, total })

		total_setup_cost += Number(detailData.setup_cost)
		total_machine_time_cost += Number(detailData.machine_time_cost) * Number(detail.quantity)
		total_one_prime_cost += Number(detailData.one_prime_cost)
		total_one_profit += Number(detailData.one_profit)
		total_one_cost += Number(detailData.one_cost)
		total_all_prime_cost_one += Number(detailData.all_prime_cost_one)
		total_all_prime_cost += Number(detailData.all_prime_cost)
		total_all_profit += Number(detailData.all_profit)
	})

	return {
		setup_cost: total_setup_cost.toFixed(3),
		machine_time_cost: total_machine_time_cost.toFixed(3),
		one_prime_cost: total_one_prime_cost.toFixed(3),
		one_profit: total_one_profit.toFixed(3),
		one_cost: total_one_cost.toFixed(3),
		all_prime_cost_one: total_all_prime_cost_one.toFixed(3),
		all_prime_cost: total_all_prime_cost.toFixed(3),
		all_profit: total_all_profit.toFixed(3),
		all_cost: total_all_cost,
	}
}
