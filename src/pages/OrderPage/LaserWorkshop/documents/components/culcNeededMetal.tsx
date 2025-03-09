import { Order } from '../../../../../models'

function round50(number: number) {
	return Math.ceil(number / 50) * 50
}
export function culcNeededMetal(orders: Order | undefined) {
	const neededMetal = orders?.setups?.map(setup => {
		let used_metal = 0
		let full_metal_length = setup.work_piece?.split(' x ')[0]
		let full_metal_width = setup.work_piece?.split(' x ')[1]

		let used_metal_length = 0
		let used_metal_width = 0

		if (setup.custom) {
			let detail_metal_lengt = 0
			let detail_metal_width = 0

			setup.details?.forEach(detail => {
				detail_metal_lengt += Number(detail.l_size) * Number(detail.setup_detail.count)
				detail_metal_width += Number(detail.w_size) * Number(detail.setup_detail.count)
			})

			used_metal = ((detail_metal_lengt * detail_metal_width) / (Number(full_metal_length) * Number(full_metal_width))) * Number(setup.program_runs)
			used_metal_length = Number(full_metal_length)
			used_metal_width = Number(full_metal_width)
		} else {
			let min_metal_length = setup.min_work_piece?.split(' x ')[0]
			let min_metal_width = setup.min_work_piece?.split(' x ')[1]

			let rounded_used_metal_lengh = round50(Number(min_metal_length))
			let rounded_used_metal_width = round50(Number(min_metal_width))

			let used_metal_length = 0
			let used_metal_width = 0

			if (Number(full_metal_length) - rounded_used_metal_lengh < 350) {
				used_metal_length = Number(full_metal_length)
			} else {
				used_metal_length = rounded_used_metal_lengh
			}

			if (Number(full_metal_width) - rounded_used_metal_width < 350) {
				used_metal_width = Number(full_metal_width)
			} else {
				used_metal_width = rounded_used_metal_width
			}

			used_metal = ((used_metal_length * used_metal_width) / (Number(full_metal_length) * Number(full_metal_width))) * Number(setup.program_runs)
		}

		let details_weight = 0
		setup?.details?.map(detail => {
			details_weight += Number(detail.weight) * Number(detail.quantity)
			return true
		})

		const thickness = setup?.details?.find(function (items) {
			return String(items.table_number) === String(setup.table_number)
		})

		return {
			material: setup?.material,
			table_number: setup.table_number,
			thickness: thickness?.thickness,
			metal_sheets: used_metal,
			weight_metal: details_weight,
			length: used_metal_length,
			width: used_metal_width,
		}
	})

	const groupedNeededMetal = []
	if (neededMetal) {
		for (let i = 0; i < neededMetal.length; i++) {
			const index = groupedNeededMetal.findIndex(el => el.table_number === neededMetal[i].table_number)
			if (index === -1) {
				groupedNeededMetal.push({ ...neededMetal[i] })
			} else {
				groupedNeededMetal[index].metal_sheets += neededMetal[i].metal_sheets
				groupedNeededMetal[index].weight_metal += Number(neededMetal[i].weight_metal)
			}
		}
	}
	return groupedNeededMetal
}
