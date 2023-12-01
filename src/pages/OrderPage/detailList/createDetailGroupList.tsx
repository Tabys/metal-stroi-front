import { Order, Detail } from '../../../models'

// FOR ORDER PAGE
export function CreateDetailGroupList(dataOrder: Order) {
	// CREATE DETAIL LIST
	const arrDetails: Detail[] = []
	dataOrder?.setups?.forEach(element => {
		element.details?.forEach((detail, index) => {
			detail.material = element.material
			arrDetails.push(detail)
		})
	})
	// console.log(arrDetails)

	const groupedArrDetails: Detail[] = []
	for (let i = 0; i < arrDetails.length; i++) {
		const index = groupedArrDetails.findIndex(
			el => el.name === arrDetails[i].name
		)
		if (index === -1) {
			groupedArrDetails.push({ ...arrDetails[i] })
		} else {
			groupedArrDetails[index].quantity += arrDetails[i].quantity
		}
	}
	groupedArrDetails.sort((a, b) => (a.id > b.id ? 1 : -1))
	return groupedArrDetails
}
