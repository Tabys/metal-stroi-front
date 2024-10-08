import { Detail, Order } from '../../../../../models'
import { AvailableDetail } from '../../../addProduct/availableDatail'
import { getExtraPriceMetal } from './getExtraPriceMetal'
import { getMaterialName } from './getMaterialName'
import { getSuffixes } from './getSuffixes'

type PrepArrDetilsProp = {
	arrDetails: Detail[] | undefined
	orders: Order | undefined
	full?: boolean
	poroductCount?: number
}

export function PrepArrDetils({ arrDetails, orders, full, poroductCount }: PrepArrDetilsProp) {
	const prepArrDetails = arrDetails
		? arrDetails.map((detail, index) => {
				const availableDetail = poroductCount
					? Number(detail.product_detail?.count) * poroductCount
					: full === true
					? detail.quantity
					: AvailableDetail(detail)
				const metal = orders?.metals?.find(function (items) {
					return String(items.table_number) === String(detail.table_number)
				})
				let cut_cost = ''
				if (detail.cut_type === 'laser') {
					cut_cost = (Number(detail.time) * Number(detail.cut_cost) * Number(availableDetail)).toFixed(1)
				} else {
					if (Number(detail.thickness) < 16) {
						cut_cost = (
							Number(detail.time) * Number(detail.cut_cost) +
							Number(detail.inset_cost) * Number(detail.cut_count) * Number(availableDetail)
						).toFixed(1)
					} else {
						cut_cost = (
							Number(Number(detail.length).toFixed(3)) * Number(detail.cut_cost) +
							Number(detail.inset_cost) * Number(detail.cut_count) * Number(availableDetail)
						).toFixed(1)
					}
				}
				const material = getMaterialName(detail.material)
				const extraPriceMetal = getExtraPriceMetal(orders)
				const suffixes = getSuffixes({ order: orders, detail: detail })
				const metal_cost =
					Number(detail.metal_cost) !== 0
						? (
								(availableDetail *
									Number(detail.weight) *
									(Number(metal?.metal_sheets) *
										Number(
											Math.round(Number(detail.metal_cost) + extraPriceMetal + (Number(detail.metal_cost) * Number(orders?.markup)) / 100)
										))) /
								Number(metal?.weight_metal)
						  ).toFixed(2)
						: '0'

				return {
					id: detail.id,
					thickness: detail.thickness,
					material: material,
					name: detail.name,
					cut_price: detail.cut_cost,
					cut_cost: cut_cost,
					bend_count: detail.bends_count,
					chop_count: detail.chop_count,
					time: (Number(detail.time) * availableDetail).toFixed(2),
					time_full: (Number(detail.time) * Number(detail.quantity)).toFixed(2),
					chop_cost: detail.chop_cost,
					bend_cost: detail.bend_cost,
					inset_cost: detail.inset_cost,
					cut_count: detail.cut_count,
					length: detail.length,
					choping: (Number(detail.chop_count) * Number(detail.chop_cost) * Number(availableDetail)).toFixed(1),
					bending: (Number(detail.bends_count) * Number(detail.bend_cost) * Number(availableDetail)).toFixed(1),
					metal: metal_cost,
					weight: detail.weight,
					surface: detail.serface,
					cut_type: detail.cut_type,
					quantity: availableDetail,
					polymer: detail.polymer,
					rolling: Number(detail.rolling) * availableDetail,
					drowing: detail.drowing,
					additional_setups: detail.additional_setups,
					suffixes: suffixes,
					customers_metal: detail.customers_metal,
					painting: detail.polymer_price ? detail.polymer_price * (Number(detail.serface) / 1000000) * 2 * Number(availableDetail) : 0,
				}
		  })
		: ''
	return prepArrDetails ? prepArrDetails.filter(item => item.quantity > 0) : undefined
}
