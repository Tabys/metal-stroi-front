import { Order, DocTableDetail } from '../../../../../models'
import { PrepArrDetails } from './prepArrDetails/prepArrDetails'

type PrepArrProductsProps = {
	order?: Order
	full_details?: DocTableDetail[]
}

export function PrepArrProducts({ order, full_details }: PrepArrProductsProps) {
	const prepArrProducts = order?.products?.map(product => {
		const arrDetails = product.details
		const productCount = product.quantity
		let value = 0
		let totalPrice = 0
		let metal = 0
		let detailsWeight = 0
		let detailsCutCost = 0
		let detailsChoping = 0
		let detailsBanding = 0

		const details = PrepArrDetails({
			arrDetails,
			order,
			productCount,
		})

		details?.forEach(detail => {
			const full_detail_quantity = full_details?.find(full_detail => full_detail.id === detail.id)?.quantity
			const oneKgDrawing = Number(detail.drowing) / (Number(detail.weight) * Number(full_detail_quantity))

			const cost =
				Math.ceil(
					Number(detail.bending) +
						Number(detail.choping) +
						Number(detail.cut_cost) +
						Number(detail.metal) +
						Number(detail.rolling) +
						oneKgDrawing * Number(detail.weight)
				) * Number(detail.quantity)
			totalPrice += cost
			value += (Number(detail.surface) / 1000000) * 2 * detail.quantity
			detailsWeight += Number(detail.weight)
			detailsCutCost += Number(detail.cut_cost)
			detailsChoping += Number(detail.choping)
			detailsBanding += Number(detail.bending)
			metal += Number(detail.metal) * Number(detail.quantity)
		})

		totalPrice +=
			Number(product.ac_works) * product.quantity +
			Number(product.sm_works) * product.quantity +
			Number(product.tfc_works) * product.quantity +
			Number(product.mk_works) * product.quantity +
			Number(product.smithy) * product.quantity +
			Number(product.painting_one_element_price) * product.quantity +
			Number(product.turning_works) * product.quantity +
			Number(product.design_department)

		return {
			id: product.id,
			name: product.name,
			quantity: product.quantity,
			totalPrice: totalPrice,
			painting_color: product.painting_color,
			value: value,
			painting_one_element_price: product.painting_one_element_price,
			painting_options: product.painting_options,
			weight: Number(detailsWeight) * Number(product.quantity),
			detailsWeight: detailsWeight,
			detailsCutCost: detailsCutCost,
			detailsChoping: detailsChoping,
			detailsBanding: detailsBanding,
			ac_works: product.ac_works,
			sm_works: product.sm_works,
			tfc_works: product.tfc_works,
			mk_works: product.mk_works,
			turning_works: product.turning_works ? product.turning_works : 0,
			smithy: product.smithy ? product.smithy : 0,
			design_department: product.design_department ? product.design_department : 0,
			metal: metal,
		}
	})

	prepArrProducts?.sort((a, b) => (a.id > b.id ? 1 : -1))

	return prepArrProducts ? prepArrProducts : undefined
}
