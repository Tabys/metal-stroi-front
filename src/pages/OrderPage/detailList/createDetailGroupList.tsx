import { Order, Detail } from '../../../models'

// FOR ORDER PAGE
export function CreateDetailGroupList(dataOrder: Order) {
	// CREATE DETAIL LIST
	const arrDetails: Detail[] = []
	dataOrder?.setups?.forEach(element => {
		element.details?.forEach((detail, index) => {
			detail.material = element.material
			detail.add_id = [detail.id]
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
			groupedArrDetails[index].add_id?.push(arrDetails[i].id)
		}
	}
	groupedArrDetails.sort((a, b) => (a.name > b.name ? 1 : -1))
	// console.log(groupedArrDetails)
	return groupedArrDetails
}
