import { Detail, Order } from '../../../../../../models'
import { AvailableDetail } from '../../../../LaserWorkshop/addProduct/availableDetail'
import { getExtraPriceMetal } from './getExtraPriceMetal'
import { getMaterialName } from './getMaterialName'
import { getSuffixes } from './getSuffixes'

type PrepArrDetailsProp = {
	arrDetails: Detail[] | undefined
	order: Order | undefined
	full?: boolean
	productCount?: number
}

export function PrepArrDetails({ arrDetails, order, full, productCount }: PrepArrDetailsProp) {
	const prepArrDetails = arrDetails
		? arrDetails.map((detail, index) => {
				const availableDetail = productCount
					? Number(detail.product_detail?.count) * productCount
					: full === true
					? detail.quantity
					: AvailableDetail(detail)
				const metal = order?.metals?.find(function (items) {
					return String(items.table_number) === String(detail.table_number)
				})
				let cut_cost = 0
				if (detail.cut_type === 'laser') {
					cut_cost = Number(detail.time) * Number(detail.cut_cost)
				} else {
					if (Number(detail.thickness) < 16) {
						cut_cost = Number(detail.time) * Number(detail.cut_cost) + Number(detail.inset_cost) * Number(detail.cut_count)
					} else {
						cut_cost = Number(detail.length) * Number(detail.cut_cost) + Number(detail.inset_cost) * Number(detail.cut_count)
					}
				}
				const material = getMaterialName(detail.material)
				const extraPriceMetal = getExtraPriceMetal(order)
				const suffixes = getSuffixes({ order: order, detail: detail })
				const metal_cost =
					Number(detail.metal_cost) !== 0
						? (
								(Number(detail.weight) *
									(Number(metal?.metal_sheets) *
										Number(
											Math.round(Number(detail.metal_cost) + extraPriceMetal + (Number(detail.metal_cost) * Number(order?.markup)) / 100)
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
					choping: Number(detail.chop_count) * Number(detail.chop_cost),
					bending: Number(detail.bends_count) * Number(detail.bend_cost),
					metal: metal_cost,
					weight: detail.weight,
					surface: detail.serface,
					cut_type: detail.cut_type,
					quantity: availableDetail,
					polymer: detail.polymer,
					polymer_price: detail.polymer_price,
					polymer_options: detail.polymer_options,
					rolling: Number(detail.rolling),
					drowing: detail.drowing,
					additional_setups: detail.additional_setups,
					suffixes: suffixes,
					customers_metal: detail.customers_metal,
					free: detail.free,
					painting: detail.polymer_one_element_price,
					products: detail.products,
				}
		  })
		: ''
	return prepArrDetails ? prepArrDetails.filter(item => item.quantity > 0) : undefined
}
