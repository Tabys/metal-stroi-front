import { Order } from '../../../../models'

function round50(number: number) {
	return Math.ceil(number / 50) * 50
}
export function culcNeededMetal(orders: Order | undefined) {
	const neededMetal = orders?.setups?.map(element => {
		let full_metal_length = element.work_piece?.split(' x ')[0]
		let full_metal_width = element.work_piece?.split(' x ')[1]

		let min_metal_length = element.min_work_piece?.split(' x ')[0]
		let min_metal_width = element.min_work_piece?.split(' x ')[1]

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

		let used_metal =
			(used_metal_length * used_metal_width) /
			(Number(full_metal_length) * Number(full_metal_width))

		let details_weight = 0
		element?.details?.map(detail => {
			details_weight += Number(detail.weight) * Number(detail.quantity)
		})

		const thickness = element?.details?.find(function (items) {
			return Number(items.table_number) === Number(element.table_number)
		})

		return {
			material: element?.details?.[0].material,
			table_number: element.table_number,
			thickness: thickness?.thickness,
			metal_sheets: used_metal,
			weight_metal: details_weight.toFixed(3),
			length: used_metal_length,
			width: used_metal_width,
		}
	})

	const groupedNeededMetal = []
	if (neededMetal) {
		for (let i = 0; i < neededMetal.length; i++) {
			const index = groupedNeededMetal.findIndex(
				el => el.table_number === neededMetal[i].table_number
			)
			if (index === -1) {
				groupedNeededMetal.push({ ...neededMetal[i] })
			} else {
				groupedNeededMetal[index].metal_sheets +=
					neededMetal[i].metal_sheets
			}
		}
	}

	return groupedNeededMetal
}
