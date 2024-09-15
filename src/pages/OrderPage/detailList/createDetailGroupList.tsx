import { Order, Detail } from '../../../models'

// FOR ORDER PAGE
export function CreateDetailGroupList(dataOrder: Order) {
	// CREATE DETAIL LIST
	const arrDetails: Detail[] = []
	const groupedDetails: Detail[] = []
	dataOrder?.setups?.forEach(element => {
		element.details?.forEach((detail, index) => {
			detail.material = element.material
			detail.quantity = detail.setup_detail.count
			arrDetails.push(detail)
		})
	})

	for (let i = 0; i < arrDetails.length; i++) {
		const index = groupedDetails.findIndex(
			el => el.name === arrDetails[i].name
		)
		if (index === -1) {
			groupedDetails.push({ ...arrDetails[i] })
		} else {
			groupedDetails[index].quantity += arrDetails[i].setup_detail.count
		}
	}

	groupedDetails.sort((a, b) => (a.name > b.name ? 1 : -1))
	return groupedDetails
}
