import { TFCData, TFCDetail, TFCTotalDetailsCosts } from '../../../../models'
import Decimal from 'decimal.js'

type tfcTotalDataProps = {
	details?: TFCDetail[]
	tfcData?: TFCData
}

export function tfcTotalData({ details, tfcData }: tfcTotalDataProps) {
	let total_milling_setup_time = 0
	let total_turning_setup_time = 0
	let total_tools = 0
	let total_other_workshops_works = 0
	let total_other = 0
	let total_milling_time = 0
	let total_turning_time = 0
	let total_universal_time = 0
	let total_erosion_time = 0
	let total_grinding_time = 0
	let total_outsourcing = 0
	let total_material = 0
	let total_cost = 0
	let total_details_costs: TFCTotalDetailsCosts[] = []

	details?.forEach(detail => {
		total_material += Number(detail.material) * Number(detail.quantity)
	})

	details?.forEach(detail => {
		total_milling_setup_time += Number(detail.milling_setup_time)
		total_turning_setup_time += Number(detail.turning_setup_time)
		total_tools += Number(detail.tools)
		total_other_workshops_works += Number(detail.other_workshops_works)
		total_other += Number(detail.other)
		total_milling_time += Number(detail.milling_time) * Number(detail.quantity)
		total_turning_time += Number(detail.turning_time) * Number(detail.quantity)
		total_universal_time += Number(detail.universal_time) * Number(detail.quantity)
		total_erosion_time += Number(detail.erosion_time) * Number(detail.quantity)
		total_grinding_time += Number(detail.grinding_time) * Number(detail.quantity)
		total_outsourcing += Number(detail.outsourcing) * Number(detail.quantity)

		// Расчет стоимости наладки (milling + turning)
		const setup_cost = new Decimal(detail.milling_setup_time || 0)
			.mul(tfcData?.milling_works_cost || 0)
			.div(2)
			.div(60)
			.add(
				new Decimal(detail.turning_setup_time || 0)
					.mul(tfcData?.turning_works_cost || 0)
					.div(2)
					.div(60)
			)
			.add(detail.tools || 0)
			.add(detail.other || 0)
			.div(detail.quantity || 1)

		// Расчет стоимости машинного времени
		const machine_time_cost = new Decimal(detail.milling_time || 0)
			.mul(tfcData?.milling_works_cost || 0)
			.div(60)
			.add(new Decimal(detail.turning_time || 0).mul(tfcData?.turning_works_cost || 0).div(60))
			.add(new Decimal(detail.universal_time || 0).mul(tfcData?.universal_works_cost || 0).div(60))
			.add(new Decimal(detail.erosion_time || 0).mul(tfcData?.erosion_works_cost || 0).div(60))
			.add(new Decimal(detail.grinding_time || 0).mul(tfcData?.grinding_works_cost || 0).div(60))

		// Расчет базовой стоимости детали
		const base_cost = setup_cost
			.add(machine_time_cost)
			.add(detail.outsourcing || 0)
			.add(detail.material || 0)

		// Применение коэффициентов сложности и дефектов
		const complexity_multiplier = new Decimal(detail.complexity_extra || 0).div(100).add(1)
		const defect_multiplier = new Decimal(detail.defect_extra || 0).div(100).add(1)
		const profit_multiplier = new Decimal(tfcData?.profit || 0).div(100).add(1)

		// Расчет стоимости доставки на единицу материала
		const delivery_per_material = new Decimal(tfcData?.delivery || 0).div(total_material || 1).mul(detail.material || 0)

		// Итоговая стоимость одной детали
		const total_one_detail_cost = base_cost
			.mul(complexity_multiplier)
			.mul(defect_multiplier)
			.mul(profit_multiplier)
			.add(delivery_per_material)
			.mul(new Decimal(tfcData?.rate || 0).div(100).add(1))
			.add(new Decimal(detail.other_workshops_works || 0).div(detail.quantity || 1))
			.toNumber()

		total_cost += new Decimal(total_one_detail_cost).mul(detail.quantity || 1).toNumber()

		total_details_costs.push({
			id: Number(detail.id),
			cost: total_one_detail_cost,
		})
	})

	return {
		milling_setup_time: total_milling_setup_time,
		turning_setup_time: total_turning_setup_time,
		tools: total_tools,
		other_workshops_works: total_other_workshops_works,
		other: total_other,
		milling_time: total_milling_time,
		turning_time: total_turning_time,
		universal_time: total_universal_time,
		erosion_time: total_erosion_time,
		grinding_time: total_grinding_time,
		outsourcing: total_outsourcing,
		material: total_material,
		cost: total_cost,
		details_costs: total_details_costs,
	}
}
