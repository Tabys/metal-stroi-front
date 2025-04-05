import { TFCData, TFCDetail, TFCTotalDetailsCosts } from '../../../../models'
import Decimal from 'decimal.js'

type tfcTotalDataProps = {
	details?: TFCDetail[]
	tfcData?: TFCData
}

export function tfcTotalData({ details, tfcData }: tfcTotalDataProps) {
	let total_setup_time = 0
	let total_tools = 0
	let total_other_workshops_works = 0
	let total_other = 0
	let total_machine_time = 0
	let total_locksmiths_works = 0
	let total_outsourcing = 0
	let total_material = 0
	let total_cost = 0
	let total_details_costs: TFCTotalDetailsCosts[] = []

	details?.forEach(detail => {
		total_material += Number(detail.material) * Number(detail.quantity)
	})

	details?.forEach(detail => {
		total_setup_time += Number(detail.setup_time)
		total_tools += Number(detail.tools)
		total_other_workshops_works += Number(detail.other_workshops_works)
		total_other += Number(detail.other)
		total_machine_time += Number(detail.machine_time) * Number(detail.quantity)
		total_locksmiths_works += Number(detail.locksmiths_works) * Number(detail.quantity)
		total_outsourcing += Number(detail.outsourcing) * Number(detail.quantity)

		const total_one_detail_cost = new Decimal(detail.setup_time)
			.mul(tfcData?.machine_cost || 0)
			.div(2)
			.div(60)
			.add(detail.tools || 0)
			.add(detail.other || 0)
			.div(detail.quantity || 1)
			.add(new Decimal(detail.machine_time || 0).mul(tfcData?.machine_cost || 0).div(60))
			.add(detail.locksmiths_works || 0)
			.add(detail.outsourcing || 0)
			.add(detail.material || 0)
			.mul(new Decimal(detail.complexity_extra || 0).div(100).add(1))
			.mul(new Decimal(detail.defect_extra || 0).div(100).add(1))
			.mul(new Decimal(tfcData?.profit || 0).div(100).add(1))
			.add(new Decimal(tfcData?.delivery || 0).div(total_material || 1).mul(detail.material || 0))
			.mul(new Decimal(tfcData?.rate || 0).div(100).add(1))
			.add(new Decimal(detail.other_workshops_works || 0).div(detail.quantity || 1))
			.ceil()
			.toNumber()

		total_cost += new Decimal(total_one_detail_cost).mul(detail.quantity || 1).toNumber()

		total_details_costs.push({
			id: Number(detail.id),
			cost: total_one_detail_cost,
		})
	})

	return {
		setup_time: total_setup_time,
		tools: total_tools,
		other_workshops_works: total_other_workshops_works,
		other: total_other,
		machine_time: total_machine_time,
		locksmiths_works: total_locksmiths_works,
		outsourcing: total_outsourcing,
		material: total_material,
		cost: total_cost,
		details_costs: total_details_costs,
	}
}
