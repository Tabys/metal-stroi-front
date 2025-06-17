import { Detail, Order } from '../../../../../../models'
import { extraPrice } from '../../updPrices/extraPriceMetal'

type culcMetalPriceOneDetailProps = {
	order: Order
	detail: Detail
}

export function culcMetalPriceOneDetail({ order, detail }: culcMetalPriceOneDetailProps) {
	const extraPriceMetal = extraPrice(order.markup)

	const metal = order?.metals?.find(function (items) {
		return String(items.table_number) === String(detail.table_number)
	})
	const metal_cost =
		Number(detail.metal_cost) !== 0
			? (
					(Number(detail.weight) *
						(Number(metal?.metal_sheets) *
							Number(Math.round(Number(detail.metal_cost) + extraPriceMetal + (Number(detail.metal_cost) * Number(order?.markup)) / 100)))) /
					Number(metal?.weight_metal)
			  ).toFixed(2)
			: '0'
	return metal_cost
}
