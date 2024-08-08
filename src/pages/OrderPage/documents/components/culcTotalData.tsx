import { DocTableDetail, DocTableProductSpec, Order } from '../../../../models'
type CulcTotalDataProps = {
	details: DocTableDetail[] | undefined
	products?: DocTableProductSpec[] | undefined
	orders?: Order
}
export function CulcTotalData({
	details,
	products,
	orders,
}: CulcTotalDataProps) {
	let total_price = 0
	let total_quantity = 0
	let total_weight = 0
	let total_chop = 0
	let total_bend = 0
	let total_choping = 0
	let total_bending = 0
	let total_metal = 0
	let total_time = 0
	let total_length = 0
	let total_inset = 0
	let total_cuting = 0
	let total_cuting_laser = 0
	let total_cuting_plasma = 0
	let total_painting = 0
	let total_rolling = 0
	let total_drowing = 0

	// Only Products
	let total_prod_painting = 0
	let total_prod_turning_works = 0
	let total_prod_smithy = 0
	let total_prod_welding = 0
	let total_prod_design_department = 0
	let total_prod_price = 0
	let total_prod_quantity = 0

	// Total Weight
	details?.forEach(detail => {
		total_weight += Number(detail.weight) * Number(detail.quantity)
	})
	products?.forEach(product => {
		total_weight += product.weight ? product.weight * product.quantity : 0
	})

	// Delivery
	let deliveryCost: number | null = null
	let oneKgDelivery: number = 0

	if (orders?.delivery! && orders?.delivery > 0) {
		deliveryCost = orders?.delivery + orders?.pallets * 500
		oneKgDelivery = Number(deliveryCost) / total_weight
	}

	details?.forEach(detail => {
		total_price +=
			Number(detail.bending) +
			Number(detail.choping) +
			Number(detail.cut_cost) +
			Number(detail.metal) +
			Number(detail.painting) +
			Number(detail.rolling) +
			Number(detail.drowing) +
			oneKgDelivery * Number(detail.weight) * detail.quantity

		total_quantity += detail.quantity
		// total_weight += Number(detail.weight) * Number(detail.quantity)
		total_chop += Number(detail.chop_count) * Number(detail.quantity)
		total_bend += Number(detail.bend_count) * Number(detail.quantity)
		total_choping += Number(detail.choping)
		total_bending += Number(detail.bending)
		total_metal += Number(detail.metal)
		total_time += Number(detail.time)
		total_length += Number(
			detail.cut_type === 'plasma' ? Number(detail.length).toFixed(2) : 0
		)
		total_inset += Number(
			detail.cut_type === 'plasma' ? detail.cut_count : 0
		)
		total_cuting += Number(detail.cut_cost)
		total_cuting_laser +=
			detail.cut_type === 'laser' ? Number(detail.cut_cost) : 0
		total_cuting_plasma +=
			detail.cut_type === 'plasma' ? Number(detail.cut_cost) : 0
		total_painting += Number(detail.painting)
		total_rolling += detail.rolling ? 1 : 0
		total_drowing += detail.drowing ? detail.drowing : 0
	})
	products?.forEach(product => {
		total_price +=
			product.totalPrice +
			oneKgDelivery * Number(product.weight) * Number(product.quantity)

		total_quantity += product.quantity
		// total_weight += product.weight ? product.weight * product.quantity : 0

		// Only Products
		total_prod_quantity += Number(product.quantity)
		total_prod_price += Math.ceil(
			product.totalPrice +
				oneKgDelivery *
					Number(product.weight) *
					Number(product.quantity)
		)
		total_prod_painting += product.painting_cost
			? Number(product.painting_cost) * Number(product.quantity)
			: 0
		total_prod_turning_works += product.turning_works
			? Number(product.turning_works) * Number(product.quantity)
			: 0
		total_prod_smithy += product.smithy
			? Number(product.smithy) * Number(product.quantity)
			: 0
		total_prod_welding += product.welding
			? Number(product.welding) * Number(product.quantity)
			: 0
		total_prod_design_department += product.design_department
			? Number(product.design_department) * Number(product.quantity)
			: 0
	})

	const total_data = {
		price: Math.ceil(total_price),
		quantity: total_quantity,
		weight: total_weight,
		chop: total_chop,
		bend: total_bend,
		choping: total_choping,
		bending: total_bending,
		metal: total_metal,
		time: total_time,
		length: total_length,
		inset: total_inset,
		cuting: total_cuting,
		cuting_laser: total_cuting_laser,
		cuting_plasma: total_cuting_plasma,
		painting: total_painting,
		rolling: total_rolling,
		drowing: total_drowing,

		prod_painting: total_prod_painting,
		prod_turning_works: total_prod_turning_works,
		prod_smithy: total_prod_smithy,
		prod_welding: total_prod_welding,
		prod_design_department: total_prod_design_department,
		prod_price: total_prod_price,
		prod_quantity: total_prod_quantity,

		oneKgDelivery: oneKgDelivery,
	}

	return total_data
}
