import { Detail, NeededMetal, Order } from '../../../../models'

type PrepArrDetilsProp = {
	arrDetails: '' | Detail[]
	neededMetal: NeededMetal[]
	orders: Order | undefined
}

export function PrepArrDetils({
	arrDetails,
	neededMetal,
	orders,
}: PrepArrDetilsProp) {
	const prepArrDetails = arrDetails
		? arrDetails.map((detail, index) => {
				const metal = neededMetal.find(function (items) {
					return (
						Number(items.table_number) ===
						Number(detail.table_number)
					)
				})

				let cut_cost = ''
				if (detail.cut_type === 'laser') {
					cut_cost = (
						Number(detail.time) * Number(detail.cut_cost)
					).toFixed(1)
				} else {
					if (Number(detail.thickness) < 16) {
						cut_cost = (
							Number(detail.time) * Number(detail.cut_cost) +
							Number(detail.inset_cost) * Number(detail.cut_count)
						).toFixed(1)
					} else {
						cut_cost = (
							Number(Number(detail.length).toFixed(3)) *
								Number(detail.cut_cost) +
							Number(detail.inset_cost) * Number(detail.cut_count)
						).toFixed(1)
					}
				}
				return {
					thickness: detail.thickness,
					name: detail.name,
					cut_price: detail.cut_cost,
					cut_cost: cut_cost,
					bend_count: detail.bends_count,
					chop_count: detail.chop_count,
					time: detail.time,
					chop_cost: detail.chop_cost,
					bend_cost: detail.bend_cost,
					inset_cost: detail.inset_cost,
					cut_count: detail.cut_count,
					length: detail.length,
					choping: (
						Number(detail.chop_count) * Number(detail.chop_cost)
					).toFixed(1),
					bending: (
						Number(detail.bends_count) * Number(detail.bend_cost)
					).toFixed(1),
					metal: (
						((Number(metal?.metal_sheets) *
							Number(
								Math.round(
									Number(detail.metal_cost) +
										(Number(detail.metal_cost) *
											Number(orders?.markup)) /
											100
								)
							)) /
							Number(metal?.weight_metal)) *
						Number(detail.weight)
					).toFixed(2),
					weight: detail.weight,
					cut_type: detail.cut_type,
					quantity: detail.quantity,
				}
		  })
		: ''

	return prepArrDetails ? prepArrDetails : undefined
}
