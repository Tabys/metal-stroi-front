import { Product } from '../../../models'
type CulcPaintingCostProps = {
	data: Product
	productItem: Product
}

export function CulcPaintingCost({ data, productItem }: CulcPaintingCostProps) {
	let cost = 0
	let surface = 0

	productItem.details?.forEach(detail => {
		surface += Number(detail.serface) * Number(detail.product_detail?.count)
	})

	cost = (surface / 1000000) * Number(data.painting_price)

	data.painting_cost = cost
	return data
}
