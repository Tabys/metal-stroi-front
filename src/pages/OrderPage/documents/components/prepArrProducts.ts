import { Order } from '../../../../models'
import { PrepArrDetils } from './prepArrDetails/prepArrDetails'

export function PrepArrProducts(orders: Order | undefined) {
	const prepArrProducts = orders?.products?.map(product => {
		const arrDetails = product.details
		const poroductCount = product.quantity
		let value = 0
		let totalPrice = 0
		let metal = 0
		let totalWeight = 0
		let detailsWeight = 0
		let detailsCutCost = 0
		let detailsChoping = 0
		let detailsBanding = 0

		const details = PrepArrDetils({
			arrDetails,
			orders,
			poroductCount,
		})

		details?.forEach(detail => {
			const oneKgDrowing = Number(detail.drowing) / (Number(detail.weight) * detail.quantity)

			const cost =
				Math.ceil(
					Number(detail.bending) +
						Number(detail.choping) +
						Number(detail.cut_cost) +
						Number(detail.metal) +
						Number(detail.rolling) +
						oneKgDrowing * Number(detail.weight)
				) * detail.quantity
			totalPrice += cost
			value += (Number(detail.surface) / 1000000) * 2 * detail.quantity
			totalWeight += Number(detail.weight) * detail.quantity
			detailsWeight += Number(detail.weight)
			detailsCutCost += Number(detail.cut_cost)
			detailsChoping += Number(detail.choping)
			detailsBanding += Number(detail.bending)
			metal += Number(detail.metal) * Number(detail.quantity)
		})

		totalPrice +=
			Number(product.welding_allowance) * product.quantity +
			Number(product.welding_delivery) * product.quantity +
			Number(product.welding_fixings) * product.quantity +
			Number(product.welding_install) * product.quantity +
			Number(product.welding_painting) * product.quantity +
			Number(product.welding_profit) * product.quantity +
			Number(product.welding_rolling) * product.quantity +
			Number(product.welding_tax) * product.quantity +
			Number(product.welding_work) * product.quantity +
			Number(product.smithy) * product.quantity +
			Number(product.painting_cost) * product.quantity +
			Number(product.turning_works) * product.quantity +
			Number(product.design_department)

		return {
			id: product.id,
			name: product.name,
			quantity: product.quantity,
			totalPrice: totalPrice,
			painting_color: product.painting_color,
			value: value,
			painting_cost: product.painting_cost,
			painting_options: product.painting_options,
			weight: totalWeight,
			detailsWeight: detailsWeight,
			detailsCutCost: detailsCutCost,
			detailsChoping: detailsChoping,
			detailsBanding: detailsBanding,
			welding:
				Number(product.welding_allowance) +
				Number(product.welding_delivery) +
				Number(product.welding_fixings) +
				Number(product.welding_install) +
				Number(product.welding_painting) +
				Number(product.welding_profit) +
				Number(product.welding_rolling) +
				Number(product.welding_tax) +
				Number(product.welding_work),
			turning_works: product.turning_works ? product.turning_works : 0,
			smithy: product.smithy ? product.smithy : 0,
			design_department: product.design_department ? product.design_department : 0,
			metal: metal,
		}
	})

	return prepArrProducts ? prepArrProducts : undefined
}
