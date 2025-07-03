import { DocTableDetail, DocTableProductSpec, Order } from '../../../../../models'
type CulcTotalDataProps = {
	details?: DocTableDetail[]
	full_details?: DocTableDetail[]
	products?: DocTableProductSpec[]
	orders?: Order
}
export function CulcTotalData({ details, full_details, products, orders }: CulcTotalDataProps) {
	let total_price = 0
	let total_quantity = 0
	let total_weight = 0
	let total_weight_without_free = 0
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

	let total_metal_all = 0
	let total_cuting_all = 0
	let total_bending_all = 0
	let total_choping_all = 0
	let total_rolling_all = 0
	let total_painting_all = 0
	let total_cuting_laser_all = 0
	let total_cuting_plasma_all = 0

	// Only Products
	let total_prod_painting = 0
	let total_prod_turning_works = 0
	let total_prod_smithy = 0
	let total_prod_sm_works = 0
	let total_prod_mk_works = 0
	let total_prod_tfc_works = 0
	let total_prod_ac_works = 0
	let total_prod_design_department = 0
	let total_prod_price = 0
	let total_prod_quantity = 0

	details?.forEach(detail => {
		total_weight += Number(detail.weight) * Number(detail.quantity)
		total_weight_without_free += detail.free ? 0 : Number(detail.weight) * Number(detail.quantity)
	})

	products?.forEach(product => {
		total_weight += Number(product.weight)
		total_weight_without_free += Number(product.weight)
	})

	// Delivery
	let deliveryCost: number | null = null
	let oneKgDelivery: number = 0
	if (orders?.delivery! && orders?.delivery > 0) {
		deliveryCost = orders?.delivery + orders?.pallets * 500
		oneKgDelivery = Number(deliveryCost) / Number(total_weight_without_free)
	}

	details?.forEach(detail => {
		const full_detail_quantity = full_details?.find(full_detail => full_detail.id === detail.id)?.quantity
		const oneKgDrowing = detail.free ? 0 : Number(detail.drowing) / (Number(detail.weight) * Number(full_detail_quantity))

		total_price += Number(
			(
				Number(
					(
						Number(detail.bending) +
						Number(detail.choping) +
						Number(detail.cut_cost) +
						Number(detail.metal) +
						Number(detail.painting) +
						Number(detail.rolling) +
						(detail.free ? 0 : Number(oneKgDelivery) * Number(detail.weight)) +
						(detail.free ? 0 : Number(oneKgDrowing) * Number(detail.weight))
					).toFixed(2)
				) * Number(detail.quantity)
			).toFixed(2)
		)

		total_quantity += detail.quantity
		// total_weight += Number(detail.weight) * Number(detail.quantity)
		total_chop += Number(detail.chop_count) * Number(detail.quantity)
		total_bend += Number(detail.bend_count) * Number(detail.quantity)
		total_choping += Number(detail.choping)
		total_bending += Number(detail.bending)
		total_metal += Number(detail.metal)
		total_time += Number(detail.time)
		total_length += Number(detail.cut_type === 'plasma' ? Number(detail.length).toFixed(2) : 0)
		total_inset += Number(detail.cut_type === 'plasma' ? detail.cut_count : 0)
		total_cuting += Number(detail.cut_cost)
		total_cuting_laser += detail.cut_type === 'laser' ? Number(detail.cut_cost) : 0
		total_cuting_plasma += detail.cut_type === 'plasma' ? Number(detail.cut_cost) : 0
		total_painting += Number(detail.painting)
		total_rolling += detail.rolling ? detail.rolling : 0
		total_drowing += detail.drowing ? Number(detail.drowing) : 0

		total_metal_all += Number(detail.metal) * Number(detail.quantity)
		total_cuting_all += Number(detail.cut_cost) * Number(detail.quantity)
		total_bending_all += Number(detail.bending) * Number(detail.quantity)
		total_choping_all += Number(detail.choping) * Number(detail.quantity)
		total_rolling_all += Number(detail.rolling) * Number(detail.quantity)
		total_painting_all += Number(detail.painting) * Number(detail.quantity)
		total_cuting_laser_all += detail.cut_type === 'laser' ? Number(detail.cut_cost) * Number(detail.quantity) : 0
		total_cuting_plasma_all += detail.cut_type === 'plasma' ? Number(detail.cut_cost) * Number(detail.quantity) : 0
	})
	products?.forEach(product => {
		total_price += Number((product.totalPrice + oneKgDelivery * Number(product.weight)).toFixed(2))
		total_quantity += product.quantity
		// total_weight += product.weight ? product.weight * product.quantity : 0

		// Only Products
		total_prod_quantity += Number(product.quantity)
		total_prod_price += Number((Number((product.totalPrice + oneKgDelivery * Number(product.weight)).toFixed(2)) * Number(product.quantity)).toFixed(2))
		total_prod_painting += product.painting_one_element_price ? Number(product.painting_one_element_price) * Number(product.quantity) : 0
		total_prod_turning_works += product.turning_works ? Number(product.turning_works) * Number(product.quantity) : 0
		total_prod_smithy += product.smithy ? Number(product.smithy) * Number(product.quantity) : 0
		total_prod_sm_works += product.sm_works ? Number(product.sm_works) * Number(product.quantity) : 0
		total_prod_mk_works += product.mk_works ? Number(product.mk_works) * Number(product.quantity) : 0
		total_prod_tfc_works += product.tfc_works ? Number(product.tfc_works) * Number(product.quantity) : 0
		total_prod_ac_works += product.ac_works ? Number(product.ac_works) * Number(product.quantity) : 0
		total_prod_design_department += product.design_department ? Number(product.design_department) * Number(product.quantity) : 0
	})

	const total_data = {
		price: total_price,
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

		metal_all: total_metal_all,
		cuting_all: total_cuting_all,
		bending_all: total_bending_all,
		choping_all: total_choping_all,
		rolling_all: total_rolling_all,
		painting_all: total_painting_all,
		cuting_laser_all: total_cuting_laser_all,
		cuting_plasma_all: total_cuting_plasma_all,

		prod_painting: total_prod_painting,
		prod_turning_works: total_prod_turning_works,
		prod_smithy: total_prod_smithy,
		prod_sm_works: total_prod_sm_works,
		prod_mk_works: total_prod_mk_works,
		prod_tfc_works: total_prod_tfc_works,
		prod_ac_works: total_prod_ac_works,
		prod_design_department: total_prod_design_department,
		prod_price: total_prod_price,
		prod_quantity: total_prod_quantity,

		oneKgDelivery: oneKgDelivery,
	}

	return total_data
}
