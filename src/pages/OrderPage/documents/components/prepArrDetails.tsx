import { Detail, NeededMetal, Order } from '../../../../models'

type PrepArrDetilsProp = {
	arrDetails: '' | Detail[]
	orders: Order | undefined
}

export function PrepArrDetils({ arrDetails, orders }: PrepArrDetilsProp) {
	const prepArrDetails = arrDetails
		? arrDetails.map((detail, index) => {
				const metal = orders?.metals?.find(function (items) {
					return (
						String(items.table_number) ===
						String(detail.table_number)
					)
				})

				let cut_cost = ''
				if (detail.cut_type === 'laser') {
					cut_cost = (
						Number(detail.time) *
						Number(detail.cut_cost) *
						Number(detail.quantity)
					).toFixed(1)
				} else {
					if (Number(detail.thickness) < 16) {
						cut_cost = (
							Number(detail.time) * Number(detail.cut_cost) +
							Number(detail.inset_cost) *
								Number(detail.cut_count) *
								Number(detail.quantity)
						).toFixed(1)
					} else {
						cut_cost = (
							Number(Number(detail.length).toFixed(3)) *
								Number(detail.cut_cost) +
							Number(detail.inset_cost) *
								Number(detail.cut_count) *
								Number(detail.quantity)
						).toFixed(1)
					}
				}

				let extraPriceMetal: number = 0
				switch (orders?.markup) {
					case 0:
						extraPriceMetal = 0
						break
					case 2:
						extraPriceMetal = 0
						break
					case 7:
						extraPriceMetal = 100
						break
					case 10:
						extraPriceMetal = 150
						break
				}

				return {
					thickness: detail.thickness,
					name: detail.name,
					cut_price: detail.cut_cost,
					cut_cost: cut_cost,
					bend_count: detail.bends_count,
					chop_count: detail.chop_count,
					time: (Number(detail.time) * detail.quantity).toFixed(2),
					chop_cost: detail.chop_cost,
					bend_cost: detail.bend_cost,
					inset_cost: detail.inset_cost,
					cut_count: detail.cut_count,
					length: detail.length,
					choping: (
						Number(detail.chop_count) *
						Number(detail.chop_cost) *
						Number(detail.quantity)
					).toFixed(1),
					bending: (
						Number(detail.bends_count) *
						Number(detail.bend_cost) *
						Number(detail.quantity)
					).toFixed(1),
					metal: (
						(detail.quantity *
							Number(detail.weight) *
							(Number(metal?.metal_sheets) *
								Number(
									Math.round(
										Number(detail.metal_cost) +
											extraPriceMetal +
											(Number(detail.metal_cost) *
												Number(orders?.markup)) /
												100
									)
								))) /
						Number(metal?.weight_metal)
					).toFixed(2),
					weight: detail.weight,
					cut_type: detail.cut_type,
					quantity: detail.quantity,
				}
		  })
		: ''

	return prepArrDetails ? prepArrDetails : undefined
}
