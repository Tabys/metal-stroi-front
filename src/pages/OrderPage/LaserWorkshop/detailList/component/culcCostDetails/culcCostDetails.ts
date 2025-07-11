import { Detail, DocTableDetail } from '../../../../../../models'

type culcCostDetailProp = {
	detailsInProduct: DocTableDetail[] | undefined
	detailOutProduct: Detail
	delivery: number
	editedDetailsFull?: DocTableDetail[]
}

export function culcCostDetail({ detailsInProduct, detailOutProduct, delivery, editedDetailsFull }: culcCostDetailProp) {
	const oneDetailInProduct = detailsInProduct?.find(detail => detail.id === detailOutProduct.id && detail.free === false)
	const full_detail_quantity = editedDetailsFull?.find(full_detail => full_detail.id === detailOutProduct.id && full_detail.free === false)?.quantity

	let cost = 0
	if (oneDetailInProduct) {
		const oneKgDrowing = Number(oneDetailInProduct.drowing) / (Number(oneDetailInProduct.weight) * Number(full_detail_quantity))
		cost = Number(
			(
				Number(
					(
						Number(oneDetailInProduct.bending) +
						Number(oneDetailInProduct.choping) +
						Number(oneDetailInProduct.cut_cost) +
						Number(oneDetailInProduct.metal) +
						Number(oneDetailInProduct.painting) +
						Number(oneDetailInProduct.rolling) +
						delivery * Number(oneDetailInProduct.weight) +
						oneKgDrowing * Number(oneDetailInProduct.weight)
					).toFixed(2)
				) * Number(oneDetailInProduct.quantity)
			).toFixed(2)
		)
	}

	return cost
}
