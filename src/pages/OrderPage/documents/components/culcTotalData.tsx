import { DocTableDetail, DocTableProduct, Product } from '../../../../models'
type CulcTotalDataProps = {
	details: DocTableDetail[] | undefined
	products?: DocTableProduct[] | undefined
}
export function CulcTotalData({ details, products }: CulcTotalDataProps) {
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
	details?.forEach(detail => {
		total_price +=
			Number(detail.bending) +
			Number(detail.choping) +
			Number(detail.cut_cost) +
			Number(detail.metal) +
			Number(detail.painting) +
			Number(detail.drowing)
		total_quantity += detail.quantity
		total_weight += Number(detail.weight) * Number(detail.quantity)
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
	})
	products?.forEach(product => {
		total_price += product.totalPrice
		total_quantity += product.quantity
		total_weight += product.weight ? product.weight : 0
	})

	const total_data = {
		price: total_price,
		quantity: total_quantity,
		weight: total_weight,
		chop: total_chop,
		bend: total_bend,
		choping: total_choping,
		bending: total_bending,
		metal: total_metal.toFixed(1),
		time: total_time,
		length: total_length,
		inset: total_inset,
		cuting: total_cuting.toFixed(1),
		cuting_laser: total_cuting_laser.toFixed(1),
		cuting_plasma: total_cuting_plasma.toFixed(1),
		painting: total_painting.toFixed(3),
	}

	return total_data
}
