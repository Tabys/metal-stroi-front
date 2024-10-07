import { Order } from '../../../models'
import { groupDetails } from './grupDetails'

export function dubleDetails(order: Order) {
	const details = groupDetails(order)

	let groupedDetails = []
	let dubles = []
	for (let i = 0; i < details.length; i++) {
		const index = groupedDetails.findIndex(el => el.name === details[i].name)
		if (index === -1) {
			groupedDetails.push({ ...details[i] })
		} else {
			dubles.push(Number(details[i].id))
		}
	}

	return dubles
}
