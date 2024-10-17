import { DocTableDetail } from '../../../../models'

export function culcProductIndex(details: DocTableDetail[] | undefined) {
	let productIndex = 0

	details?.forEach(detail => {
		if (detail.painting) {
			productIndex += 1
		}
	})

	return productIndex
}
