import { Detail, DocTableDetail } from '../../../models'

export function AvailableDetail(detail: Detail | DocTableDetail) {
	let productsCount = 0
	let detailsCount = 0
	let quantity = 0

	detail?.products?.map(product => {
		productsCount = product.quantity
		detailsCount = product.product_detail?.count
			? product.product_detail?.count
			: 0
		quantity += productsCount * detailsCount
	})

	const availableCount = detail?.quantity - quantity

	return availableCount
}
