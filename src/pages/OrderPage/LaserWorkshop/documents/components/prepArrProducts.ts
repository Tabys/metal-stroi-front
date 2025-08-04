import { Order, DocTableDetail } from '../../../../../models'

type PrepArrProductsProps = {
	order?: Order
	full_details?: DocTableDetail[]
}

export function PrepArrProducts({ order, full_details }: PrepArrProductsProps) {
	const prepArrProducts = order?.products?.map(product => {
		let value = 0
		let totalPrice = 0
		let metal = 0
		let detailsWeight = 0
		let detailsCutCost = 0
		let detailsChoping = 0
		let detailsBanding = 0

		// Используем уже готовые данные full_details вместо повторного вызова PrepArrDetails
		product.details?.forEach(productDetail => {
			const fullDetail = full_details?.find(fd => fd.id === productDetail.id)
			if (!fullDetail) return

			const detailQuantity = Number(productDetail.product_detail?.count) * product.quantity
			const full_detail_quantity = fullDetail.quantity

			const oneKgDrawing = Number(fullDetail.drowing) / (Number(fullDetail.weight) * Number(full_detail_quantity))

			const cost = Number(
				(
					Number(
						(
							Number(fullDetail.bending) +
							Number(fullDetail.choping) +
							Number(fullDetail.cut_cost) +
							Number(fullDetail.metal) +
							Number(fullDetail.rolling) +
							oneKgDrawing * Number(fullDetail.weight)
						).toFixed(2)
					) * detailQuantity
				).toFixed(2)
			)

			totalPrice += cost
			value += (Number(fullDetail.surface) / 1000000) * 2 * detailQuantity
			detailsWeight += Number(fullDetail.weight) * Number(productDetail.product_detail?.count)
			detailsCutCost += Number(fullDetail.cut_cost)
			detailsChoping += Number(fullDetail.choping)
			detailsBanding += Number(fullDetail.bending)
			metal += Number(fullDetail.metal) * detailQuantity
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
