import { TFCData, TFCDetail, TFCTotal } from '../../../../models'
import Decimal from 'decimal.js'

type tfcSummeryDataDetailProps = {
	detail?: TFCDetail
	tfcData?: TFCData
	total?: TFCTotal
}

export function tfcSummeryDataDetail({ detail, tfcData, total }: tfcSummeryDataDetailProps) {
	const setting_up = new Decimal(detail?.setup_time || 0)
		.mul(new Decimal(tfcData?.machine_cost || 0).div(2))
		.div(60)
		.toDecimalPlaces(3)
		.toNumber()

	const machine_cost = new Decimal(detail?.machine_time || 0)
		.mul(tfcData?.machine_cost || 0)
		.div(60)
		.toDecimalPlaces(3)
		.toNumber()

	const one_prime_cost = new Decimal(setting_up)
		.add(machine_cost)
		.add(detail?.tools || 0)
		.add(detail?.other || 0)
		.add(detail?.locksmiths_works || 0)
		.add(detail?.outsourcing || 0)
		.add(detail?.material || 0)
		.add(new Decimal(tfcData?.delivery || 0).div(total?.material || 1).mul(detail?.material || 0))
		.mul(new Decimal(detail?.defect_extra || 0).div(100).add(1))
		.mul(new Decimal(detail?.complexity_extra || 0).div(100).add(1))
		.toDecimalPlaces(3)
		.toNumber()

	const one_profit = new Decimal(one_prime_cost)
		.mul(tfcData?.profit || 1)
		.div(100)
		.toDecimalPlaces(3)
		.toNumber()

	const one_cost = new Decimal(one_prime_cost)
		.add(one_profit)
		.mul(new Decimal(tfcData?.rate || 0).div(100).add(1))
		.toDecimalPlaces(3)
		.toNumber()

	const all_prime_cost_one = new Decimal(total?.details_costs.find(item => item.id === detail?.id)?.cost || 0)
		.sub(new Decimal(detail?.other_workshops_works || 0).div(detail?.quantity || 1))
		.div(new Decimal(tfcData?.profit || 0).div(100).add(1))
		.div(new Decimal(tfcData?.rate || 0).div(100).add(1))
		.toDecimalPlaces(3)
		.toNumber()

	const all_prime_cost = new Decimal(all_prime_cost_one)
		.mul(detail?.quantity || 0)
		.toDecimalPlaces(3)
		.toNumber()

	const all_profit = new Decimal(all_prime_cost)
		.mul(tfcData?.profit || 1)
		.div(100)
		.toDecimalPlaces(3)
		.toNumber()

	const all_cost = new Decimal(all_prime_cost)
		.add(all_profit)
		.mul(new Decimal(tfcData?.rate || 0).div(100).add(1))
		.toDecimalPlaces(3)
		.toNumber()

	return {
		setting_up,
		machine_cost,
		one_prime_cost,
		one_profit,
		one_cost,
		all_prime_cost_one,
		all_prime_cost,
		all_profit,
		all_cost,
	}
}
