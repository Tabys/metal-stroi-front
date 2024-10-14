import { Detail, DocTableDetail } from '../../../../../models'

type culcCostDetailProp = {
	detailsInProduct: DocTableDetail[] | undefined
	detailOutProduct: Detail
	delivery: number
}

export function culcCostDetail({ detailsInProduct, detailOutProduct, delivery }: culcCostDetailProp) {
	const oneDetailInProduct = detailsInProduct?.find(detail => detail.id === detailOutProduct.id)
	let cost = 0
	if (oneDetailInProduct) {
		const oneKgDrowing = Number(oneDetailInProduct.drowing) / (Number(oneDetailInProduct.weight) * oneDetailInProduct.quantity)
		cost =
			Math.ceil(
				Number(oneDetailInProduct.bending) +
					Number(oneDetailInProduct.choping) +
					Number(oneDetailInProduct.cut_cost) +
					Number(oneDetailInProduct.metal) +
					Number(oneDetailInProduct.painting) +
					Number(oneDetailInProduct.rolling) +
					delivery * Number(oneDetailInProduct.weight) +
					oneKgDrowing * Number(oneDetailInProduct.weight)
			) * oneDetailInProduct.quantity
	}

	return cost
}
