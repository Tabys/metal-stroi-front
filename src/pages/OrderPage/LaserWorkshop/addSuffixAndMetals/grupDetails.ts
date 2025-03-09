import { Detail, Order } from '../../../../models'

export function groupDetails(order: Order) {
	const groupedDetails: Detail[] = []

	order.setups?.forEach(setup => {
		setup.details?.forEach(detail => {
			groupedDetails.push(detail)
		})
	})
	return groupedDetails
}
