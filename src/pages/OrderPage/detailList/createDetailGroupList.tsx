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

	arrDetails.sort((a, b) => (a.name > b.name ? 1 : -1))
	return arrDetails
}
